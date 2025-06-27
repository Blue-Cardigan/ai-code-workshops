import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Target, DollarSign, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ConversionMetrics {
  totalAssessments: number;
  totalLeads: number;
  conversionRate: number;
  averageQuoteValue: number;
  topTracks: Array<{ track: string; count: number; }>;
  dailyLeads: Array<{ date: string; count: number; }>;
}

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState<ConversionMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      // Fetch assessment submissions from Supabase
      const { data: submissions, error } = await supabase
        .from('assessment_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (submissions) {
        const totalAssessments = submissions.length;
        const totalLeads = submissions.filter(s => s.email && s.contact_name).length;
        const conversionRate = totalAssessments > 0 ? (totalLeads / totalAssessments) * 100 : 0;
        
        const averageQuoteValue = submissions
          .filter(s => s.quote_value)
          .reduce((sum, s) => sum + (s.quote_value || 0), 0) / 
          submissions.filter(s => s.quote_value).length || 0;

        // Track distribution
        const trackCounts = submissions.reduce((acc, s) => {
          acc[s.recommended_track] = (acc[s.recommended_track] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topTracks = Object.entries(trackCounts)
          .map(([track, count]) => ({ track, count: count as number }))
          .sort((a, b) => b.count - a.count);

        // Daily leads for last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        }).reverse();

        const dailyLeads = last7Days.map(date => ({
          date,
          count: submissions.filter(s => 
            s.created_at && s.created_at.startsWith(date) && s.email
          ).length
        }));

        setMetrics({
          totalAssessments,
          totalLeads,
          conversionRate,
          averageQuoteValue,
          topTracks,
          dailyLeads,
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Conversion Analytics</h2>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Assessments</p>
              <p className="text-2xl font-bold text-blue-900">{metrics.totalAssessments}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Qualified Leads</p>
              <p className="text-2xl font-bold text-green-900">{metrics.totalLeads}</p>
            </div>
            <Mail className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-900">
                {metrics.conversionRate.toFixed(1)}%
              </p>
            </div>
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Avg Quote Value</p>
              <p className="text-2xl font-bold text-orange-900">
                £{Math.round(metrics.averageQuoteValue).toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Tracks */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tracks</h3>
          <div className="space-y-3">
            {metrics.topTracks.map((track) => (
              <div key={track.track} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {track.track}
                </span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{
                        width: `${(track.count / metrics.topTracks[0]?.count || 1) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{track.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Leads Trend */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Daily Leads (Last 7 Days)
          </h3>
          <div className="space-y-2">
            {metrics.dailyLeads.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{
                        width: `${Math.max(10, (day.count / Math.max(...metrics.dailyLeads.map(d => d.count), 1)) * 100)}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{day.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Analytics Setup</h4>
        <p className="text-sm text-blue-800">
          To enable full analytics tracking, set up your Google Analytics 4 and/or Segment 
          tracking IDs in your environment variables. This dashboard shows Supabase-based 
          conversion data.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 
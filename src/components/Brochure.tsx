import React, { useRef, useState, useEffect } from 'react';
import { Clock, Download, Code, ArrowLeft, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface BrochureProps {
  onBackToHome?: () => void;
}

const Brochure = ({ onBackToHome }: BrochureProps) => {
  const brochureRef = useRef<HTMLDivElement>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        const response = await fetch('/workshop-brochure.md');
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        const content = await response.text();
        setMarkdownContent(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workshop content');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownContent();
  }, []);

  const handleDownloadPDF = () => {
    const element = brochureRef.current;
    const opt = {
      margin: 0.5,
      filename: 'ai-enhanced-development-workshop-syllabus.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const customComponents = {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 pb-4" style={{ borderColor: '#ff6f68' }}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-l-4 pl-4" style={{ borderColor: '#ffc861' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3 p-3 rounded-lg border-l-2" style={{ backgroundColor: '#fdf7f7', borderColor: '#ff6f68' }}>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mt-4 mb-2" style={{ color: '#ff6f68' }}>
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="mb-1">
        {children}
      </li>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-600">
        {children}
      </em>
    ),
    code: ({ children, className }: any) => {
      const isBlock = className?.includes('language-');
      if (isBlock) {
        return (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200">
            <code className="text-sm text-gray-800 font-mono">
              {children}
            </code>
          </pre>
        );
      }
      return (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
          {children}
        </code>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 py-2 rounded-r-lg mb-4 italic text-gray-700" style={{ borderColor: '#ffc861', backgroundColor: '#fdf7f7' }}>
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="border-t-2 my-8" style={{ borderColor: '#ffc861' }} />
    ),
    a: ({ children, href }: any) => (
      <a 
        href={href} 
        className="underline font-medium hover:opacity-80"
        style={{ color: '#ff6f68' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#ff6f68' }}></div>
          <p className="text-gray-600">Loading workshop content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Content</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="underline hover:opacity-80"
              style={{ color: '#ff6f68' }}
            >
              Return to Home
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header with Navigation */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Home
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ff6f68' }}>
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Workshop Syllabus</h1>
                <p className="text-gray-600 text-sm">AI-Enhanced Development Training</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#ffc861' }}
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Brochure Content */}
      <div ref={brochureRef} className="max-w-5xl mx-auto px-4 bg-white rounded-lg shadow-sm">
        {/* Professional Header for PDF */}
        <div className="p-8 border-b border-gray-200" style={{ backgroundColor: '#fdf7f7' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ff6f68' }}>
                <Code className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Development Academy</h1>
                <p className="text-lg text-gray-600">Professional Workshop Training Syllabus</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Professional Training Framework</p>
              <p className="text-sm text-gray-500">4-hour Workshops • Online & In-Person</p>
              <p className="text-sm text-gray-500">Contact: john@coefficient.ai</p>
            </div>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-lg max-w-none p-8">
          <ReactMarkdown 
            components={customComponents}
            remarkPlugins={[remarkGfm]}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="p-8 border-t text-center" style={{ backgroundColor: '#fdf7f7' }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Clock size={20} className="text-gray-500" />
            <span className="text-gray-600">All training sessions comprise 4 hours of instructor-led content</span>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>📧 john@coefficient.ai</span>
            <span>🌐 https://coefficient.training</span>
            <span>📞 Professional AI Development Training</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochure; 
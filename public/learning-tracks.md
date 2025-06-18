flowchart TB
    subgraph Profile1 [" "]
        A1["Intro to Vibe Coding: Build &amp; Deploy Your First AI App"]
        A2["Prompt Engineering for Power Users"]
        A3["Git &amp; GitHub for Beginners with AI Helpers"]
    end
    A1 --> A2
    A2 --> A3

    A1:::profile1
    A2:::profile1
    A3:::profile1
    classDef profile1 fill:#e8f5e8,stroke:#4caf50,stroke-width:3px,color:#000

    subgraph Profile2 [" "]
        B1["Refactor Like a Pro: Clean Code with AI Pairing Tools"] 
        B2["From Playground to Production: Shipping AI Projects"]
        B3["Testing in the Age of Copilot"]
        B4["PromptOps: Reusable Prompt Libraries & Debugging LLMs"]
        B5["AI-Assisted Notebooks: Coding Faster with GPT in Jupyter"]

        B1 --> B2
        B2 --> B3
        B3 --> B4
        B1 --> B5
    end

    classDef profile2 fill:#fff3e0,stroke:#ff9800,stroke-width:3px,color:#000

    subgraph Profile3 [" "]
        C1[Cursor + Claude + GitHub:<br/>Full Workflow Mastery]
        C2[CI/CD in a<br/>Vibe Coding World]
        C3[Secure by Design:<br/>DevSecOps for AI-Era Engineers]
        C4[Fine-Tuning the Vibes:<br/>Training and Evaluating LLMs]
        C5[AI Debugging:<br/>Helping LLMs Help You]
        
        C1 --> C2
        C2 --> C3
        C3 --> C4
        C2 --> C5
    end
    
    classDef profile3 fill:#e3f2fd,stroke:#2196f3,stroke-width:3px,color:#000

    subgraph Tracks [" "]
        T1[New to Coding Track<br/>Workshops 1→2→3]
        T2[AI-Augmented Engineer Track<br/>Workshops 4→6→8→9]
        T3[ML Engineer to AI Dev Track<br/>Workshops 11→12→13]
        T4[Frontend Focus<br/>Workshop 1 or 4→5→8]
        T5[Backend Focus<br/>Workshop 3→6→8→10]
        T6[PromptOps / AI PM Focus<br/>Workshops 2→7→13]
    end
    
    classDef tracks fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#000
    
    class T1,T2,T3,T4,T5,T6 tracks
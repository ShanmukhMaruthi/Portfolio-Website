import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Automation</h4>
                <h5>Data Dynamo 2.0 Hackathon</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Developed an AI-powered automated EDA report generation platform using n8n and Gemini AI that transformed CSV datasets into professional PDF analytics reports with automated email delivery.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst Intern</h4>
                <h5>OdinSchool</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Performed end-to-end analysis on a retail dataset, built an automated CSV → Python → MySQL data pipeline using SQLAlchemy, optimized business-driven SQL queries, and designed an interactive Power BI dashboard featuring KPI cards to identify customer segments and key revenue drivers.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development</h4>
                <h5>Vision Nova Hackathon</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Qualified among the Top 10 teams in the Open Innovation category. Built FoodBridge, a full-stack food donation platform connecting food donors, NGOs, and beneficiaries through emergency requests and community support modules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

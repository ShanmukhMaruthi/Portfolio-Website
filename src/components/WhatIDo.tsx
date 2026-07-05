import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }

    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          {/* DATA ANALYTICS CARD */}

          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>

            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DATA ANALYTICS</h3>

              <h4>Transforming data into meaningful business insights.</h4>

              <p>
                I analyze, clean, visualize, and interpret business data to
                uncover trends, solve real-world problems, and build interactive
                dashboards that support data-driven decision making.
              </p>

              <h5>Skills & Tools</h5>

              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">SQL</div>
                <div className="what-tags">Power BI</div>
                <div className="what-tags">Excel</div>
                <div className="what-tags">Pandas</div>
                <div className="what-tags">NumPy</div>
                <div className="what-tags">Power Query</div>
                <div className="what-tags">DAX</div>
                <div className="what-tags">MySQL</div>
              </div>

              <div className="what-arrow"></div>
            </div>
          </div>

          {/* MACHINE LEARNING CARD */}

          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>

            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>MACHINE LEARNING</h3>

              <h4>Building intelligent AI-powered applications.</h4>

              <p>
                I develop machine learning and AI solutions using Python,
                Scikit-learn, FastAPI, and modern NLP techniques to automate
                tasks, generate insights, and solve complex business problems.
              </p>

              <h5>Skills & Tools</h5>

              <div className="what-content-flex">
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">Machine Learning</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">NLP</div>
                <div className="what-tags">RAG</div>
                <div className="what-tags">Git</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Streamlit</div>
              </div>

              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");

  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
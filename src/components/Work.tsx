import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");

      if (!box.length) return;

      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;

      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;

      const padding =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;

      translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  const projects = [
    {
      number: "01",
      name: "Customer Shopping Behavior Analysis",
      category: "Data Analytics | Power BI Dashboard",
      description:
        "Analyzed customer purchasing behavior and created an interactive Power BI dashboard to uncover sales trends, customer demographics, and purchasing insights.",
      tools: "Python • SQL • MySQL • Power BI",
      image: "/images/customer-shopping.png",
    },
    {
      number: "02",
      name: "PhonePe Payment Analytics Dashboard",
      category: "Business Intelligence Dashboard",
      description:
        "Built an interactive Power BI dashboard to analyze digital payment transactions, revenue growth, user activity, and payment trends using DAX and Power Query.",
      tools: "Power BI • DAX • Power Query",
      image: "/images/phone-dashboard.png",
    },
    {
      number: "03",
      name: "Online Retail Customer Segmentation",
      category: "Machine Learning | Customer Analytics",
      description:
        "Applied RFM Analysis and K-Means Clustering to segment customers into meaningful groups for targeted marketing and business decision making.",
      tools: "Python • SQL • Scikit-learn • Power BI",
      image: "/images/customer-segmentation.png",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.number}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>

                <h4>Project Overview</h4>
                <p>{project.description}</p>

                <h4>Tools & Technologies</h4>
                <p>{project.tools}</p>
              </div>

              <WorkImage
                image={project.image}
                alt={project.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
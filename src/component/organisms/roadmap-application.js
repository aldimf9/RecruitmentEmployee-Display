import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faSearch, faComments, faCheck } from "@fortawesome/free-solid-svg-icons";


const ModalRoadmapApplication = ({ data }) => {

  const iconMap = {
  "Apply": faFlag,
  "Screening CV": faSearch,
  "HR Interview": faComments,
  "User Interview": faComments,
  "Pre Offering": faCheck,
  "On Boarding": faCheck,
};

  return (
    <div className="container py-5">
      <h3 className="text-center mb-5 font-weight-bold">Roadmap {data?.job} Application</h3>

      <ul className="timeline position-relative list-unstyled">
        {data?.roadmap.map((rdmp, index) => (
          <li className="timeline-item position-relative mb-5" key={index}>
            <div className="timeline-badge d-flex align-items-center justify-content-center">
              <FontAwesomeIcon icon={iconMap[rdmp.action]} />
            </div>
            <div
              className={`timeline-panel ${index % 2 === 0 ? "text-right float-left" : "text-left float-right"
                }`}
            >
              <h5>{rdmp?.action}</h5>
              {/* <p className="mb-1">{rdmp.description}</p> */}
              <small className="text-muted">Date: {rdmp?.submit_date}</small>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .timeline {
          position: relative;
          padding: 20px 0;
        }

        .timeline::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #28a745;
          left: 50%;
          margin-left: -2px;
        }

        .timeline-item {
          position: relative;
        }

        .timeline-badge {
          position: absolute;
          top: 0;
          left: 50%;
          width: 40px;
          height: 40px;
          margin-left: -20px;
          background-color: #28a745;
          border-radius: 50%;
          color: #fff;
          font-size: 18px;
          z-index: 10;
        }

        .timeline-panel {
          position: relative;
          width: 46%;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
        }

        .timeline-item:nth-child(even) .timeline-panel {
          float: right;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default ModalRoadmapApplication;

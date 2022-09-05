import { useState, useEffect } from "react";
import { Table, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import quotationsApi from "../../../api/quotationsApi";

const DashCrypto = () => {
  const [data, setData] = useState({});

  const handleLoad = async () => {
    const response = await quotationsApi.getDashboardData();

    if (response.ok) return setData(response.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <Row>
        <Col md={6} xl={4}>
          <Card className="theme-bg bitcoin-wallet">
            <Card.Body>
              <h5 className="text-white mb-2">Companies</h5>
              <h2 className="text-white mb-3 f-w-300">{data?.numberOfUsers}</h2>

              <i className="fas fa-building f-70 text-white" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="theme-bg2 bitcoin-wallet">
            <Card.Body>
              <h5 className="text-white mb-2">Branches</h5>
              <h2 className="text-white mb-3 f-w-300">
                {data?.numberOfBranches}
              </h2>

              <i className="fas fa-store f-70 text-white" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={4}>
          <Card className="theme-bg bitcoin-wallet">
            <Card.Body>
              <h5 className="text-white mb-2">Users</h5>
              <h2 className="text-white mb-3 f-w-300">
                {data?.numberOfCompanies}
              </h2>

              <i className="fa fa-users f-70 text-white" />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Recent Quotations</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  {data?.top7Quotations?.map((q) => (
                    <tr className="unread" key={q.id}>
                      <td>
                        <h6 className="mb-1">{q.companyName}</h6>
                        <p className="m-0">{q.branchName}</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          {new Date(q.date).toDateString()}
                        </h6>
                      </td>
                      <td>
                        {q.status ? (
                          <Link
                            to="#"
                            className="label theme-bg2 text-white f-12"
                          >
                            Approved
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="label theme-bg text-white f-12"
                          >
                            Pending
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="fa-solid fa-file-invoice-dollar f-30 text-c-red" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">{data?.numberOfRejected}</h3>
                  <span className="d-block text-uppercase">Total Pending</span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="fa-solid fa-receipt f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">{data?.numberOfAccepted}</h3>
                  <span className="d-block text-uppercase">Total Approved</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashCrypto;

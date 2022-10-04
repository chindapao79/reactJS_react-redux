import { useEffect, useState } from "react";
import { Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
export const FilterCountry = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["capital", "name", "numericCode"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    const data = Object.values(items);

    function search(items) {
        return items.filter((item) => {
            if (item.region == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
            return null;
        });
    }

    if (error) {
        return (
            <p>
                {error.message}, if you get this error, the free API I used
                might have stopped working, but I created a simple example that
                demonstrate how this works,{" "}
            </p>
        );
    } else if (!isLoaded) {
        return <>loading...</>;
    } else {
        return (
            <div className="wrapper">
                <div className="search-wrapper d-inline-flex m-4">
                    <div>
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input form-control"
                                placeholder="Search for..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="select">
                        <Form.Select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries By Region"
                        >
                            <option value="All">Filter By Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </Form.Select>
                        <span className="focus"></span>
                    </div>
                </div>
                <Container>
                    <Row>
                        {search(data).map((item, i) => (
                            <Col sm='2' md='2' lg='2' className="mt-3" key={i}>
                                <Card style={{ width: '13em', maxHeight: '27em', height: 'auto' }}>
                                    <Card.Img className="" variant="top" src={item.flag.large} alt={item.name} />
                                    <Card.Body>
                                        <Card.Title className="d-inline-block text-truncate" style={{ maxWidth: '150px' }}>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.alpha3Code}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>{item.population}</ListGroup.Item>
                                        <ListGroup.Item>{item.region}</ListGroup.Item>
                                        <ListGroup.Item>{item.capital}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Card.Link href="#">View</Card.Link>
                                        <Card.Link href="#">Copy Link</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div >
        );
    }
}

export default FilterCountry;
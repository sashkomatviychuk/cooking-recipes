import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap' 

const Home = (props) => (
    <Row>
        <Col md={12}>
            <div>
                It is our home page. We love cooking :)
            </div>
            <h3>
                Last recipes:
            </h3>
            <div>No recipes added last time...</div>
        </Col>
    </Row>
)

export default Home
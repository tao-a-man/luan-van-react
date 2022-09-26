import { Component } from 'react';
import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
import SpecialistItem from '../../component/SpecialistItem';
import appService from '../../services/appService';
import { Row, Container, Col } from 'react-bootstrap';
import './Specialist.scss';
class Specialist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
        };
    }
    componentDidMount() {
        this.getDoctor(this.props.params.id);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.params.id !== this.props.params.id) {
            this.getDoctor(nextProps.params.id);
            return true;
        } else if (nextState.listDoctor !== this.state.listDoctor) {
            return true;
        }
        return false;
    }
    getDoctor = async (id) => {
        const respon = await appService.getAllDoctorByIdOfSpecialist(id);
        if (respon.infoDetailDoctor[0]) {
            respon.infoDetailDoctor.forEach((item, index) => {
                item.managerData.image = new Buffer(item.managerData.image.data, 'base64').toString('binary');
            });
            this.setState({ listDoctor: respon.infoDetailDoctor });
        }
    };
    render() {
        const listDoctor = this.state.listDoctor;
        const name = listDoctor[0] ? listDoctor[0].managerData.specialistData.name : '';
        const description = listDoctor[0] ? listDoctor[0].managerData.description : '';
        const infoSpecialist = `<div><strong>Chuyên Khoa ${name} chuyên tư vấn hỗ trợ điều trị các bệnh lý và triệu chứng:</strong><p>${description}...</p></div>`;
        return (
            <>
                <div className="content pt-4">
                    <Container fluid="xl" style={{ border: '1px solid black' }}>
                        <Row className="justify-content-md-center">
                            <Col className="title" style={{ border: '1px solid black' }}>
                                {name}
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col style={{ border: '1px solid black' }}>
                                <div className="mt-4" dangerouslySetInnerHTML={{ __html: infoSpecialist }}></div>
                            </Col>
                        </Row>
                    </Container>
                    {listDoctor.map((item, index) => {
                        return <SpecialistItem doctor={item}></SpecialistItem>;
                    })}
                </div>
            </>
        );
    }
}

export default withParamsAndNavigate(Specialist);

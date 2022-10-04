import React, { Component } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import swal from 'sweetalert';
// light zoom image
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
// Mark down
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// parse base 64
import CommonUtils from '../../utils/CommonUtils';

import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
import appService from '../../services/appService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditDetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialist: [],
            isOpenPreview: false,
            username: '',
            price: '',
            fullname: '',
            age: '',
            phoneNumber: '',
            specialistId: '',
            nameClinic: '',
            addressClinic: '',
            image: '',
            description: '',
            contentHTML: '',
            contentMarkdown: '',
            position: '',
            regions: '',
            userId: '',
        };
    }
    async componentDidMount() {
        const specialist = await appService.getSpecialist();
        const { id, fullname, username, age } = this.props.params;
        const respon = await this.getInfoDetailDoctor(id);
        if (respon.infoDetailDoctor.image) {
            respon.infoDetailDoctor.image = new Buffer(respon.infoDetailDoctor.image.data, 'base64').toString('binary');
        }
        this.setState({
            specialist: specialist.specialist,
            userId: id,
            username,
            fullname,
            age,
            ...respon.infoDetailDoctor,
            image: respon.infoDetailDoctor.image ? respon.infoDetailDoctor.image : '',
            ...respon.infoDetailDoctor.markdownData,
            ...respon.infoDetailDoctor.phone,
        });
    }

    async getInfoDetailDoctor(id) {
        const respon = await appService.getInfoDetailDoctor(id);
        return respon;
    }

    handleChangeInputImg = async (e) => {
        const data = e.target.files;
        const avatarPreview = URL.createObjectURL(data[0]);
        const image = await CommonUtils.getBase64(data[0]);
        this.setState({
            image: avatarPreview,
            image: image,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({ contentHTML: html, contentMarkdown: text });
    };
    handleChangeInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
    handleEditDetailDoctor = async () => {
        const copyState = { ...this.state };
        delete copyState.createdAt;
        delete copyState.isOpenPreview;
        delete copyState.markdownData;
        delete copyState.phone;
        delete copyState.specialist;
        delete copyState.updatedAt;

        const respon = await appService.putEditDetailDoctor(copyState);
        if (respon.errCode === 0) {
            swal({
                title: 'Edit Doctor Success!',
                icon: 'success',
            });
        } else {
            swal({
                title: 'Error',
                text: respon.errMessage.errors[0].message,
                icon: 'error',
            });
        }
    };
    render() {
        return (
            <div className="row mt-4 ms-2 me-2">
                <input value={this.state.id} hidden disabled></input>
                <div className="form-group col-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">UserName</InputGroup.Text>
                        <Form.Control
                            value={this.state.username}
                            disabled
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">FullName</InputGroup.Text>
                        <Form.Control
                            value={this.state.fullname}
                            disabled
                            placeholder="Full Name"
                            aria-label="FullName"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-2 mb-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Age</InputGroup.Text>
                        <Form.Control
                            value={this.state.age}
                            disabled
                            placeholder="Age"
                            aria-label="Age"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
                        <Form.Control
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={(e) => this.handleChangeInput(e)}
                            type="number"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Specialist</InputGroup.Text>
                        <Form.Select
                            aria-label="Default select example"
                            name="specialistId"
                            onChange={(e) => this.handleChangeInput(e)}
                        >
                            <option hidden>Choice Specialist</option>
                            {this.state.specialist.map((item) => {
                                return (
                                    <option
                                        value={+item.id}
                                        key={+item.id}
                                        selected={this.state.specialistId == item.id}
                                    >
                                        {item.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className="form-group col-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Priced</InputGroup.Text>
                        <Form.Control
                            name="price"
                            value={this.state.price}
                            onChange={(e) => this.handleChangeInput(e)}
                            type="number"
                            placeholder="Price"
                            aria-label="Price"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Text size="sm">VND</InputGroup.Text>
                        <InputGroup.Text>.000</InputGroup.Text>
                    </InputGroup>
                </div>
                <div className="form-group col-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Name Clinic</InputGroup.Text>
                        <Form.Control
                            name="nameClinic"
                            value={this.state.nameClinic}
                            onChange={(e) => this.handleChangeInput(e)}
                            placeholder="Name Clinic"
                            aria-label="NameClinic"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text htmlFor="aa" id="basic-addon1">
                            Adress Clinic
                        </InputGroup.Text>
                        <Form.Control
                            name="addressClinic"
                            value={this.state.addressClinic}
                            onChange={(e) => this.handleChangeInput(e)}
                            id="aa"
                            placeholder="Adress Clinic"
                            aria-label="AdressClinic"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-4">
                    <InputGroup className="mb-3">
                        <label for="inputStateImg">
                            <InputGroup.Text id="basic-addon1">Choice Avatar</InputGroup.Text>
                        </label>
                        <div
                            style={{
                                marginLeft: '4px',
                                border: '1px solid #ccc',
                                height: '84px',
                                width: '118px',
                                background: `url('${this.state.image}') center center / contain no-repeat`,
                            }}
                            onClick={() => {
                                if (!this.state.image) return;
                                this.setState({ isOpenPreview: true });
                            }}
                        ></div>
                        {this.state.isOpenPreview && (
                            <Lightbox
                                mainSrc={this.state.image}
                                reactModalStyle={{ zIndex: '2000' }}
                                onCloseRequest={() => this.setState({ isOpenPreview: false })}
                            />
                        )}
                        <input
                            onChange={(e) => this.handleChangeInputImg(e)}
                            id="inputStateImg"
                            type="file"
                            hidden
                        ></input>
                    </InputGroup>
                </div>
                <div className="form-group col-4" style={{ marginTop: '-46px' }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text for="aa" id="basic-addon1">
                            Position
                        </InputGroup.Text>
                        <Form.Select
                            aria-label="Default select example"
                            name="position"
                            onChange={(e) => this.handleChangeInput(e)}
                        >
                            <option hidden>Choice Position</option>
                            <option value="Bác sĩ" selected={this.state.position === 'Bác sĩ'}>
                                Bác sĩ
                            </option>
                            <option value="Thạc sĩ, Bác sĩ" selected={this.state.position === 'Thạc sĩ, Bác sĩ'}>
                                Thạc sĩ
                            </option>
                            <option value="Tiến sĩ, Bác sĩ" selected={this.state.position === 'Tiến sĩ, Bác sĩ'}>
                                Tiến sĩ
                            </option>
                            <option
                                value="Phó Giáo sư, Tiến sĩ"
                                selected={this.state.position === 'Phó Giáo sư, Tiến sĩ'}
                            >
                                Phó Giáo sư
                            </option>
                            <option value="Giáo sư, Tiến sĩ" selected={this.state.position === 'Giáo sư, Tiến sĩ'}>
                                Giáo sư
                            </option>
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className="form-group col-5" style={{ marginTop: '-46px' }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text for="aa" id="basic-addon1">
                            Regions
                        </InputGroup.Text>
                        <Form.Select
                            aria-label="Default select example"
                            name="regions"
                            onChange={(e) => this.handleChangeInput(e)}
                        >
                            <option hidden>Choice regions</option>
                            <option value="Hà Nội" selected={this.state.regions === 'Hà Nội'}>
                                Hà Nội
                            </option>
                            <option value="TP HCM" selected={this.state.regions === 'TP HCM'}>
                                TP HCM
                            </option>
                            <option value="Cần Thơ" selected={this.state.regions === 'Cần Thơ'}>
                                Cần Thơ
                            </option>
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className="form-group col-12">
                    <InputGroup className="mb-3">
                        <InputGroup.Text for="aa" id="basic-addon1">
                            Description
                        </InputGroup.Text>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={this.state.description}
                            onChange={(e) => this.handleChangeInput(e)}
                            id="aa"
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-12">
                    <InputGroup className="mb-3">
                        <InputGroup.Text for="aa" id="basic-addon1">
                            Detail Description
                        </InputGroup.Text>

                        <MdEditor
                            value={this.state.contentMarkdown}
                            style={{ height: '45vh', width: '100vw' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </InputGroup>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                        this.handleEditDetailDoctor();
                    }}
                >
                    Edit Doctor
                </Button>
            </div>
        );
    }
}

export default withParamsAndNavigate(EditDetailDoctor);

import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slideritem from '../../../component/SliderItem/SliderItem';
import './HomeSection.scss';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ height: '40px', width: '40px', backgroundColor: 'red', zIndex: '4' }}
            onClick={onClick}
            zIndex={4}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ height: '40px', width: '40px', backgroundColor: 'red', zIndex: '4' }}
            onClick={onClick}
        />
    );
}

class HomeSection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
        };
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageHeader(language);
    };

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        return (
            <div className="section">
                <Slider {...settings}>
                    <Slideritem title={this.state.name} img={this.state.image}></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                </Slider>
            </div>
        );
    }
}

export default HomeSection;

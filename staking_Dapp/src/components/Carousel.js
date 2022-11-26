import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../img/01.jpg';
import img2 from '../img/02.png';
import img3 from '../img/03.png';


class MyCarousel extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <a href='#'>
                        <img
                            className="d-block w-100 style"
                            src={img1}
                            alt=''
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href='#'>
                        <img
                            className="d-block w-100"
                            src={img2}
                            alt=''
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href='#'>
                        <img
                            className="d-block w-100"
                            src={img3}
                            alt=''
                        />
                    </a>
                </Carousel.Item>
            </Carousel>

        );
    }
}

export default MyCarousel;
import React, { Component } from 'react';
import { Card, Row, Col, Statistic, Icon } from 'antd';
import styles from './index.less';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

class Detail extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    Artículo Seleccionado
                </div>
                <div className={styles.carouselContainer}>
                    <Carousel>
                        <img src="http://lorempixel.com/300/300" />
                        <img src="http://lorempixel.com/300/300" />
                        <img src="http://lorempixel.com/300/300" />
                        <img src="http://lorempixel.com/300/300" />
                    </Carousel>
                    <div className={styles.content} >
                        <div className={styles.description} >Placa madre X5SS como una esta en come</div>
                        <div className={styles.price} >S/. {'500'} </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.location}>
                        <Icon type="environment" /> Av. la calle en sicuani
                    </div>
                    <div className={styles.info}>
                        <span>Cantidad: 5230</span>
                        <span>Disponible: PZA</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;

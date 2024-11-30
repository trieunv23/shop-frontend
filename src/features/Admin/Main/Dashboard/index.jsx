import React from 'react';
import './styless.scss';

const Dashboard = () => {
    return (
        <div className='dashboard-wr'>
            <div className="slides">
                <div className="slide-title">
                    <span>Ảnh slides</span>
                </div>

                <div className="slide-imgs">
                    <div className="slide-item">
                        <div className="img-content">
                            <span className="image-index">
                                STT: 1
                            </span>

                            <div className="content-detail">
                                Size: 30 x 40
                            </div>
                        </div>

                        <div className="slide-image">
                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/70ca8b42b8fb334f403a3f03f7382da9.jpg" alt="" />
                        </div>

                        <div className="slide-action">
                            <button>Xóa</button>
                        </div>
                    </div>

                    <div className="slide-item">
                        <div className="img-content">
                            <span className="image-index">
                                STT: 1
                            </span>

                            <div className="content-detail">
                                Size: 30 x 40
                            </div>
                        </div>

                        <div className="slide-image">
                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/small/20240430/03b131188c589769e2111628175ce116.jpg" alt="" />
                        </div>
                    </div>

                    <div className="slide-item">
                        <div className="img-content">
                            <span className="image-index">
                                STT: 1
                            </span>

                            <div className="content-detail">
                                Size: 30 x 40
                            </div>
                        </div>

                        <div className="slide-image">
                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/small/20240430/03b131188c589769e2111628175ce116.jpg" alt="" />
                        </div>
                    </div>

                    <div className="slide-item">
                        <div className="img-content">
                            <span className="image-index">
                                STT: 1
                            </span>

                            <div className="content-detail">
                                Size: 30 x 40
                            </div>
                        </div>

                        <div className="slide-image">
                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/small/20240430/03b131188c589769e2111628175ce116.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
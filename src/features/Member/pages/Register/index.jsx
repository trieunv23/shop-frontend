import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Header from '../../../../components/Header'

Register.propTypes = {
    
};

function Register(props) {
    return (
        <div className='wrap'>
            <Header />
            <div className="register-wr">
                <div className="title">
                    <span>Đăng kí thành viên</span>
                </div>

                <form action="" id='register-form'>
                    <h4>Thông tin cơ bản</h4>

                    <div className="form-block">
                        <p className='title-field'>Tên đăng nhập</p>
                        <div className='input-field'>
                            <input type="text" id="member-id" />
                            <div className="desc">
                                <span className='usn-message'>Vui lòng nhập username của bạn. </span>
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Mật khẩu</p>
                        <div className='input-field'>
                            <input type="text" id="member-id" />
                            <div className="tooltip">
                                <p>Điều kiện nhập mật khẩu</p>
                                <div>
                                    <span>- Kết hợp hai hoặc nhiều chữ hoa và chữ thường/số/ký tự đặc biệt, 10 đến 16 ký tự</span>
                                    <br />
                                    <span>- Ký tự đặc biệt có thể nhập</span>
                                    <br />
                                    <span>&nbsp;&nbsp;&nbsp; ~ `! @ # $ % ^ ( ) * _ - = { } [ ] | ; : &lt; &gt; , . ? / </span>
                                    <br />
                                    <span>- Không thể nhập dấu cách</span>
                                    <br />
                                    <span>- Không thể sử dụng các chữ cái và số liên tiếp</span>
                                    <br />
                                    <span>- Không thể sử dụng các chữ cái và số giống nhau nhiều lần</span>
                                    <br />
                                    <span>- Không thể bao gồm ID</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Xác minh mật khẩu</p>
                        <div className='input-field'>
                            <input type="text" id="member-id" />
                            <div className="desc">
                                <span className='pw-confirm-msg'></span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Tên</p>
                        <div className='input-field'>
                            <input type="text" id="member-id" />
                            <div className="desc">
                                <span className='usn-message'>Vui lòng nhập username của bạn. </span>
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Địa chỉ</p>
                        <div className='input-field'>
                            <input type="text" id="member-id" />
                            <div className="desc">
                                <span className='usn-message'>Vui lòng nhập username của bạn. </span>
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Điện thoại</p>
                        <div className='input-field tel-box'>
                            <input type="text"  maxlength="3" size="3" placeholder='xxx' />
                            <span>-</span>
                            <input type="text"  maxlength="3" size="3"placeholder='xxx' />
                            <span>-</span>
                            <input type="text"  maxlength="4" size="4" placeholder='xxxx'/>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Email</p>
                        <div className='input-field'>
                            <input type="text" id="member-id" />
                            <div className="desc">
                                <span className='usn-message'>Vui lòng nhập username của bạn. </span>
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Giới tính</p>
                        <div className='input-field'>
                            <input type="radio" name="" id="sex_0" />
                            <label htmlFor="">Nam</label>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Ngày sinh</p>
                        <div className='input-field'>
                            <input type="text" id="member-id" />
                            <div className="desc">
                                <span className='usn-message'>Vui lòng nhập username của bạn. </span>
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
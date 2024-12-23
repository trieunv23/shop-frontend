import React, { useEffect, useState } from 'react';
import './styless.scss';
import { fetchBanners } from '../../../../services/api/admin/banner';
import { API_URL } from '../../../../constants/config';
import { isValidateImageFile } from '../../../../utils/fileUpload';
import { Button, Upload } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { UploadOutlined } from '@ant-design/icons';

const Dashboard = () => {
    const [banners, setBanners] = useState([]);
    const [fileList, setFileList] = useState([]);

    const { handleSubmit, control } = useForm({
        defaultValues: {

        }
    });

    const beforeUpload = (file) => {
        if (!isValidateImageFile(file)) {
            return Upload.LIST_IGNORE;
        }
        return true;
    }

    const handleUploadChange = (info, field) => {
        const updatedFileList = info.fileList.map(file => ({
            ...file,
            originFileObj: file.originFileObj || file
        }));
        setFileList(updatedFileList);
        field.onChange(updatedFileList.map(file => file.originFileObj));
    };

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const { banners } = await fetchBanners();
                setBanners(banners);

                console.log(banners);
            } catch (error) {
                console.log(error);
            }
        }

        loadBanners();
    }, []);

    const onSubmit = async (data) => {
        

        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div className='dashboard-wr'>
            <div className="slides">
                <div className="slide-title">
                    <span>Ảnh slides</span>
                </div>

                <div className="slide-imgs">
                    { banners.map((banner) => (
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
                                <img src={`${API_URL}/storage/${banner.path}`} alt="" />
                            </div>
    
                            <div className="slide-action">
                                <button>Xóa</button>
                            </div>
                        </div>
                    )) }
                </div>

                <Controller 
                    name='images'
                    control={control}
                    render={({ field }) => (
                        <Upload
                            {...field}
                            listType="picture"
                            beforeUpload={beforeUpload}
                            onChange={(infor) => handleUploadChange(infor, field)}
                            className='upload-images'
                            fileList={fileList}
                        >
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    )}
                />
            </div>
        </div>
    );
};

export default Dashboard;
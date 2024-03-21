import { CheckCircleOutlined, MinusCircleOutlined, StopOutlined } from '@ant-design/icons';
import { Steps, theme } from 'antd';
import TargetIcon from 'composants/icons/TargetIcon';
import { useEffect, useState } from 'react';

const TimeLine = ({ items }) => {
    const { token } = theme.useToken();
    const primaire3 = `${token.colorPrimary}4D`;
    const primaire05 = `${token.colorPrimary}0D`;
    const [current, setCurrent] = useState(0);
    const [mappedItem, setMappedItem] = useState([]);

    useEffect(() => {
        const mapped = items.map((item, index) => {
            if (item.current) {
                setCurrent(index);
            }
            switch (item.type) {
                case 'success':
                    return { title: <span style={{ color: token.colorPrimary }}>{item.libelle}</span>, icon: <CheckCircleOutlined /> };
                case 'waiting':
                    return { title: <span style={{ color: '#999' }}>{item.libelle}</span>, icon: <MinusCircleOutlined style={{ color: '#999' }} /> };
                case 'current':
                    return { title: <span style={{ color: token.colorPrimary }}>{item.libelle}</span>, icon: <TargetIcon couleur={token.colorPrimary} /> };
                case 'error':
                    return { title: <span style={{ color: 'red' }}>{item.libelle}</span>, icon: <StopOutlined style={{ color: 'red' }} /> };
                default:
                    return {};
            }
        });
        setMappedItem(mapped);
    }, [items]);

    return (
        <div style={{ border: '1px solid ' + primaire3, backgroundColor: primaire05, padding: '20px 20px 0px', borderRadius: '4px' }}>
            <Steps size="small" current={current} labelPlacement="vertical" items={mappedItem} />
        </div>
    );
};
export default TimeLine;

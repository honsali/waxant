import { DatePicker, Form, Input } from 'antd';
import { APP_DATE_FORMAT } from 'config/constants.config';
import _ from 'core/util/extensionLodash';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampDate = (props: any) => {
    const [dateAttributes, setDateAttributes] = useState({});
    const { form, attributes, notifierChangement } = props;
    const style = { style: { ...attributes.style, width: '100%' } };
    if (props.style && props.style.width) {
        style.style.width = props.style.width;
    }

    useEffect(() => {
        if (form.__INTERNAL__.name) {
            const stringDate = form.getFieldValue(attributes.name);
            const binaryDate = stringDate ? dayjs(stringDate, APP_DATE_FORMAT) : null;

            if (_.isArray(attributes.name)) {
                const v = {};
                const d = {};
                d[attributes.sname[1]] = binaryDate;
                v[attributes.name[0]] = d;
                form.setFieldsValue(v);
            } else {
                const d = {};
                d[attributes.sname] = binaryDate;
                form.setFieldsValue(d);
            }
            setDateAttributes({ label: attributes.label, name: attributes.sname, lname: attributes.lname });
        }
    }, [form, attributes]);

    const changeValue = (binaryDate, stringDate) => {
        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.name[1]] = stringDate;
            // d[attributes.sname[1]] = binaryDate;
            v[attributes.name[0]] = d;
            form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.name] = stringDate;
            // d[attributes.sname] = binaryDate;
            form.setFieldsValue(d);
        }

        if (attributes.onChange) {
            attributes.onChange(stringDate);
        }

        if (notifierChangement) {
            notifierChangement();
        }
    };
    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(attributes.name) ? _.join(attributes.name, '.') : attributes.name;
        if (attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: attributes.label + ' est requis.' };
        }
        return { required: false };
    };
    return (
        <div>
            <Form.Item {...dateAttributes} rules={[getRules]}>
                <DatePicker
                    format={APP_DATE_FORMAT} //
                    {...style}
                    onChange={changeValue}
                    disabledDate={props.intervalleDate}
                    disabled={props.attributes.disabled}
                />
            </Form.Item>

            <Form.Item name={attributes.name} noStyle>
                <Input style={{ display: 'none' }} />
            </Form.Item>
        </div>
    );
};

export default ChampDate;

import { Form, Space } from 'antd';
import i18n from 'core/i18n/i18n';
import React, { useCallback, useEffect, useState } from 'react';

const ChampCompose = (props: any) => {
    const extract = useCallback((cprops): any => {
        const attributes = {} as any;
        const i = cprops.nom.indexOf('.');

        attributes.name = i > 0 ? [cprops.nom.substr(0, i), cprops.nom.substr(i + 1)] : cprops.nom;

        attributes.placeHolder = cprops.libelle ? cprops.libelle : i18n.libelle(i > 0 ? cprops.nom.substr(i + 1) : cprops.nom);
        attributes.noStyle = true;

        if (cprops.requis) {
            attributes.rules = [{ required: true, message: attributes.label + ' est requis.', whitespace: true }];
        }
        attributes.style = { width: cprops.ratio };
        attributes.onChange = cprops.siChange;
        attributes.disabled = cprops.disabled;
        attributes.placeholder = cprops.placeholder;
        return attributes;
    }, []);

    const [items, setItems] = useState([]);
    useEffect(() => {
        const list = [];
        React.Children.forEach(props.children, (c, index) => {
            list.push(React.cloneElement(c, { key: index, attributes: extract(c.props), form: props.form, notifierChangement: props.notifierChangement }));
        });
        setItems(list);
    }, [props.form, props.notifierChangement, props.children]);

    return (
        <Form.Item {...props.attributes}>
            <Space.Compact block>{items}</Space.Compact>
        </Form.Item>
    );
};

export default ChampCompose;

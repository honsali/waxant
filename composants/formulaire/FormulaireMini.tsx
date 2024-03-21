import { Form } from 'antd';
import { StateMessage } from 'core/flow/StateMessage';
import { useAppDispatch } from 'core/state/store.config';
import _ from 'core/util/extensionLodash';
import React, { useEffect, useState } from 'react';
import { extract } from './FormUtil';

const FormulaireMini = ({ form, siChange = null, nom = null, style = null, children }) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const liste = [];
        React.Children.forEach(children, (c, index) => {
            liste.push(React.cloneElement(c, { attributes: extract(nom, c.props), form: form, notifierChangement: siChange }));
        });
        setItems(liste);
    }, [children, form]);

    const onFieldsChange = (changedFields, allFields) => {
        if (siChange) {
            siChange(changedFields, allFields);
        }
        dispatch(StateMessage.initialiser());
    };

    return (
        <Form form={form} name={nom ? nom : _.uniqueId()} style={style} onFieldsChange={onFieldsChange}>
            {items}
        </Form>
    );
};

export default FormulaireMini;

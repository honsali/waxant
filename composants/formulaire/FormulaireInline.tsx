import { Col, Form, Row } from 'antd';
import { StateMessage } from 'core/flow/StateMessage';
import { useAppDispatch } from 'core/state/store.config';
import _ from 'core/util/extensionLodash';
import React, { useEffect, useState } from 'react';
import { extract } from './FormUtil';

const FormulaireInline = ({ form, siChange = null, nom = null, style = null, actionBloc = null, children }) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);

    useEffect(() => {
        const hiddenListe = [];
        const liste = [];
        React.Children.forEach(children, (c, index) => {
            liste.push(
                <Col key={index} flex={c.props.largeur ? c.props.largeur : 'none'}>
                    {React.cloneElement(c, { attributes: extract(nom, c.props), form: form, notifierChangement: siChange })}
                </Col>
            );
        });
        if (actionBloc) {
            liste.push(
                <Col key={9999} style={{ paddingTop: '20px' }} flex="none">
                    {actionBloc}
                </Col>
            );
        }
        setHiddenItems(hiddenListe);
        setItems(liste);
    }, [children, form]);

    const onFieldsChange = (changedFields, allFields) => {
        if (siChange) {
            siChange(changedFields, allFields);
        }
        dispatch(StateMessage.initialiser());
    };

    return (
        <Form form={form} name={nom ? nom : _.uniqueId()} style={style} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="vertical" onFieldsChange={onFieldsChange}>
            <Row gutter={24}>{items}</Row>
            <div>{hiddenItems}</div>
        </Form>
    );
};

export default FormulaireInline;

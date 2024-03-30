import { Col, Form } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { MdlMessage } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

const FormulaireInline = ({ form, siChange = null, nom = null, style = null, actionBloc = null, children }) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);
    const convert = useFormConverter();

    useEffect(() => {
        const hiddenListe = [];
        const liste = [];

        React.Children.forEach(children, (child, index) => {
            const key = `col-${index}`;
            liste.push(
                <Col key={key} flex={child.props.largeur ? child.props.largeur : 'none'}>
                    {React.cloneElement(child, { attributes: convert(nom, child.props), form: form, notifierChangement: siChange })}
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
    }, [children, form, siChange]);

    const onFieldsChange = (changedFields, allFields) => {
        siChange?.(changedFields, allFields);
        dispatch(MdlMessage.initialiser());
    };

    return (
        <Form //
            form={form}
            name={nom ? nom : _.uniqueId()}
            style={style}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            onFieldsChange={onFieldsChange}
        >
            <ListeChamp>{items}</ListeChamp>
            <div>{hiddenItems}</div>
        </Form>
    );
};

export default FormulaireInline;

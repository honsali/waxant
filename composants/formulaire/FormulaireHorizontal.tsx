import { Col, Form, Row } from 'antd';
import { StateMessage } from 'core/flow/StateMessage';
import { useAppDispatch } from 'core/state/store.config';
import _ from 'core/util/extensionLodash';
import React, { useEffect, useState } from 'react';
import { extract } from './FormUtil';

const FormulaireHorizontal = ({ form, siChange = null, nombreColonne = 1, nom = null, style = null, largeurLibelle = 'none', children }) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);

    useEffect(() => {
        const hiddenListe = [];
        const liste = [];
        let i = 1;
        React.Children.forEach(children, (c) => {
            const colWidth = c.props.surTouteLaLigne ? 24 : 24 / nombreColonne;

            if (c.props.hidden) {
                hiddenListe.push(<span key={i++}>{React.cloneElement(c, { attributes: extract(nom, c.props), form, notifierChangement: siChange })}</span>);
            } else if (c.props.cache) {
                liste.push(
                    <Col span={colWidth} key={i++}>
                        <span></span>
                    </Col>
                );
            } else if (_.estNul(c.props.invisible) || !c.props.invisible) {
                liste.push(
                    <Col span={colWidth} key={i++}>
                        {c.props.contenu ? React.cloneElement(c.props.contenu) : React.cloneElement(c, { attributes: extract(nom, c.props), form, notifierChangement: siChange })}
                    </Col>
                );
                if (c.props.seulDansLaLigne) {
                    for (let j = 0; j < nombreColonne - 1; j++) {
                        liste.push(<Col span={colWidth} key={i++}></Col>);
                    }
                }
            }
        });
        setHiddenItems(hiddenListe);
        setItems(liste);
    }, [children, nombreColonne, form]);

    const onFieldsChange = (changedFields, allFields) => {
        if (siChange) {
            siChange(changedFields, allFields);
        }
        dispatch(StateMessage.initialiser());
    };

    return (
        <Form form={form} name={nom ? nom : _.uniqueId()} style={style} onFieldsChange={onFieldsChange} labelCol={{ flex: largeurLibelle }} wrapperCol={{ flex: 'auto' }}>
            <Row gutter={24}>{items}</Row>
            <div>{hiddenItems}</div>
        </Form>
    );
};

export default FormulaireHorizontal;

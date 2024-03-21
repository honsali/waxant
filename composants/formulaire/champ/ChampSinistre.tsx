import { Form, Input, Space } from 'antd';
import Vide from 'composants/conteneur/Vide';
import _ from 'core/util/extensionLodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampSinistre = (props) => {
    const validateur = useContext(FormulaireValidateur);
    const { form, attributes } = props;
    const [champCatSinistre, setChampCatSinistre] = useState(null);
    const [champExeSinistre, setChampExeSinistre] = useState(null);
    const [champNumSinistre, setChampNumSinistre] = useState(null);

    useEffect(() => {
        if (_.isArray(attributes.name)) {
            setChampCatSinistre(_.union(attributes.name, ['catSinistre']));
            setChampExeSinistre(_.union(attributes.name, ['exeSinistre']));
            setChampNumSinistre(_.union(attributes.name, ['numSinistre']));
        } else {
            setChampCatSinistre([attributes.name, 'catSinistre']);
            setChampExeSinistre([attributes.name, 'exeSinistre']);
            setChampNumSinistre([attributes.name, 'numSinistre']);
        }
    }, [attributes]);

    const changerCatSinistre = (event) => {
        const catSinistre = event.target.value;
        const exeSinistre = form.getFieldValue(champExeSinistre);
        const numSinistre = form.getFieldValue(champNumSinistre);
        chercherSinistre(catSinistre, exeSinistre, numSinistre);
    };

    const changerExeSinistre = (event) => {
        const catSinistre = form.getFieldValue(champCatSinistre);
        const exeSinistre = event.target.value;
        const numSinistre = form.getFieldValue(champNumSinistre);
        chercherSinistre(catSinistre, exeSinistre, numSinistre);
    };

    const changerNumSinistre = (event) => {
        const catSinistre = form.getFieldValue(champCatSinistre);
        const exeSinistre = form.getFieldValue(champExeSinistre);
        const numSinistre = event.target.value;
        chercherSinistre(catSinistre, exeSinistre, numSinistre);
    };
    const chercherSinistre = (catSinistre, exeSinistre, numSinistre) => {
        if (!_.isNil(catSinistre) && !_.isNil(exeSinistre) && !_.isNil(numSinistre) && !_.isEmpty(catSinistre) && !_.isEmpty(exeSinistre) && !_.isEmpty(numSinistre)) {
            if (attributes.onChange) {
                attributes.onChange(catSinistre, exeSinistre, numSinistre);
            }
        }
    };

    const getRules = useCallback(() => {
        if (attributes.requis || (validateur && validateur['sinistre.numeroSinistre'] && validateur['sinistre.numeroSinistre'].requis)) {
            return { required: true, message: ' N° Sinistre est requis.', whitespace: true };
        }
        return { required: false };
    }, [attributes, validateur]);

    return (
        <Vide siNul={champCatSinistre}>
            <Form.Item label="N° Sinistre" rules={[getRules]}>
                <Space.Compact block>
                    <Form.Item name={champCatSinistre} style={{ width: '33%' }}>
                        <Input disabled={attributes.disabled} placeholder={attributes.placeholder} onChange={changerCatSinistre} />
                    </Form.Item>
                    <Form.Item name={champExeSinistre} style={{ width: '33%' }}>
                        <Input disabled={attributes.disabled} placeholder={attributes.placeholder} onChange={changerExeSinistre} />
                    </Form.Item>
                    <Form.Item name={champNumSinistre} style={{ width: '33%' }}>
                        <Input disabled={attributes.disabled} placeholder={attributes.placeholder} onChange={changerNumSinistre} />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
        </Vide>
    );
};

export default ChampSinistre;

import { Form, Input, Select } from 'antd';
import Vide from 'composants/conteneur/Vide';
import ServiceReference from 'core/reference/ServiceReference';
import _ from 'core/util/extensionLodash';
import { useContext, useEffect, useState } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampReferenceAvecFiltre = (props) => {
    const { Option } = Select;
    const [options, setOptions] = useState([]);
    const [maxLength, setMaxLength] = useState(0);
    const [referenceListe, setReferenceListe] = useState(null);
    const [selectAttributes, setSelectAttributes] = useState(null);
    const { form, attributes, reference, optionLibelle, notifierChangement, adapterLargeur } = props;
    const newValue = Form.useWatch(attributes.name, form);
    const argValue: any = Form.useWatch(props.arg, form);
    const [arg, setArg] = useState(props.arg);

    useEffect(() => {
        setReference(referenceListe, newValue, false);
    }, [newValue]);

    useEffect(() => {
        if (argValue && argValue.code) {
            setArg(argValue);
        }
    }, [argValue]);

    useEffect(() => {
        if (arg && arg.code) {
            setSelectAttributes({ ...attributes, name: attributes.sname });
            const refOptionList = [];
            const ref = reference ? reference : attributes.lname;
            ServiceReference.lister({ reference: ref, arg: arg.code }).then((liste) => {
                let max = 0;
                setReferenceListe(liste);
                liste.forEach((r) => {
                    const libelle = optionLibelle ? r[optionLibelle] : r.libelle;
                    max = _.estNul(libelle) ? max : Math.max(max, libelle.length);
                    const code = r.code ? r.code : '-1';
                    refOptionList.push(
                        <Option value={code} key={code}>
                            {libelle}
                        </Option>
                    );
                });
                setOptions(refOptionList);
                setMaxLength(max);
                const reference = form.getFieldValue(attributes.name);
                setReference(liste, reference, false);
            });
        } else {
            setReferenceListe([]);
            setSelectAttributes({ ...attributes, name: attributes.sname, disabled: true });
        }
    }, [reference, arg, optionLibelle]);

    const valueChanged = (valeur) => {
        setReference(referenceListe, { code: valeur }, true);
    };

    const valueCleared = () => {
        setReference(referenceListe, {}, true);
    };

    const setReference = (liste, valeur, notifier) => {
        if (liste && liste.length > 0) {
            let reference = valeur?.code ? _.find(liste, { code: valeur.code }) : {};
            if (_.estVide(reference)) {
                reference = { id: null, code: null, libelle: null };
            }
            if (_.isArray(attributes.name)) {
                const v = {};
                const d = {};
                d[attributes.name[1]] = reference;
                d[attributes.sname[1]] = reference?.libelle;
                v[attributes.name[0]] = d;
                form.setFieldsValue(v);
            } else {
                const d = {};
                d[attributes.name] = reference;
                d[attributes.sname] = reference?.libelle;
                form.setFieldsValue(d);
            }
            if (notifier && attributes.onChange) {
                attributes.onChange(reference);
            }

            if (notifierChangement) {
                notifierChangement();
            }
        }
    };

    const filter = (input, option) => {
        if (option.children) {
            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
        return false;
    };

    const getStyle = () => {
        return adapterLargeur ? { ...attributes.style, width: maxLength + 5 + 'ch' } : { ...attributes.style, width: '100%' };
    };

    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(attributes.name) ? _.join(attributes.name, '.') : attributes.name;
        if (attributes.requis || (validateur && validateur[n + '.code'] && validateur[n + '.code'].requis)) {
            return { required: true, message: attributes.label + ' est requis.' };
        }
        return { required: false };
    };

    return (
        <Vide siNul={selectAttributes} style={attributes.style}>
            <Form.Item {...selectAttributes} rules={[getRules]}>
                <Select
                    style={getStyle()} //
                    className={'champ-' + attributes.cls}
                    disabled={attributes.disabled || !arg}
                    showSearch
                    optionFilterProp="children"
                    allowClear
                    filterOption={filter}
                    onChange={valueChanged}
                    onClear={valueCleared}
                >
                    {options}
                </Select>
            </Form.Item>
            <Form.Item name={attributes.name} noStyle>
                <Input style={{ display: 'none' }} />
            </Form.Item>
        </Vide>
    );
};

export default ChampReferenceAvecFiltre;

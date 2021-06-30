import React, { useState, useEffect } from 'react';
import ItemCard from '../shopping/ItemCard';
import StringInput from '../ui/StringInput';
import CreateItemFormData from '../../constants/forms/create-item.json';

/**
 * CreateItemForm component
 */
export const CreateItemForm: React.FC = () => {
  const itemFormConfig = CreateItemFormData;

  const [formConfig, setFormConfig] = useState(itemFormConfig);
  const updateFormConfig = (key, val) => {
    const newFormConfig = JSON.parse(JSON.stringify(formConfig));
    newFormConfig[key].value = val;
    setFormConfig(newFormConfig);
  };

  return (
    <div className="container">
      <h3>ITEM</h3>
      <div className="flex-wrap-container">
        {Object.keys(formConfig).map((field, i) => {
          if (formConfig[field].type == 'text') {
            return <StringInput key={`form-field-${i}`} value={formConfig[field].value} config={formConfig[field]} updateFunc={updateFormConfig} />;
          }
        })}
      </div>
      <br />
      <ItemCard
        data={{
          _id: 'temp',
          index: 0,
          title: formConfig.title.value,
          company: formConfig.company.value,
          description: formConfig.description.value,
          discount: parseFloat(formConfig.discount.value),
          price: parseFloat(formConfig.price.value),
          quantity: parseInt(formConfig.quantity.value),
          picture: formConfig.picture.value,
          tags: formConfig.tags.value.split(',')
        }}
      />
    </div>
  );
};

export default CreateItemForm;

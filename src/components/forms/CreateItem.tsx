import React, { useState } from 'react';
import ItemCard from '../shopping/ItemCard';
import StringInput from '../ui/StringInput';
import itemFormConfig from '../../constants/forms/create-item.json';
import { Button, Divider, useToasts } from '@geist-ui/react';
import { addToDatabase } from '../Helper';

/**
 * CreateItemForm component
 */
export const CreateItemForm: React.FC = () => {
  const [, setToast] = useToasts();
  const [formConfig, setFormConfig] = useState(itemFormConfig);
  const updateFormConfig = (key, val) => {
    const newFormConfig = JSON.parse(JSON.stringify(formConfig));
    newFormConfig[key].value = val;
    setFormConfig(newFormConfig);
  };

  const reorganizeItemObject = (itemData) => {
    let newItemObject = {};
    Object.keys(itemData).map(key => {
      newItemObject[key] = itemData[key].value;
      if (key == "discount" || key == "price" || key == "quantity") {
        newItemObject[key] = parseFloat(itemData[key].value);
      }
      else if (key == "tags") {
        let tagsArray = itemData[key].value.split(',').map((v: string) => v.trim())
        newItemObject[key] = tagsArray;
      }
    })
    return newItemObject;
  }

  const createItem = () => {
    const newItem = reorganizeItemObject(formConfig);
    addToDatabase('item', newItem, setToast);
  }

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
      <Divider y={5}>Preview</Divider>
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
      <Divider y={5}>Submit</Divider>
      <Button type="success-light" onClick={createItem}>CREATE</Button>
    </div>
  );
};

export default CreateItemForm;

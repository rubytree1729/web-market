import { NextPage } from 'next';
import React from 'react';
import DaumPostcode from 'react-daum-postcode';


const DaumPost: NextPage<{ setAddressFunction: Function, setZonecodeFunction: Function }> = ({ setAddressFunction, setZonecodeFunction }) => {
  const onCompletePost = (data: any) => {
    let fullAddress = data.address;
    let referencesAddress = '';
    let zonecode = data.zonecode

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        referencesAddress += data.bname;
      }
      if (data.buildingName !== '') {
        referencesAddress += referencesAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += referencesAddress !== '' ? ` (${referencesAddress})` : '';
    }
    setAddressFunction(fullAddress)
    setZonecodeFunction(zonecode)
  };

  return (
    <>
      <DaumPostcode autoClose onComplete={onCompletePost} />
    </>
  );
};

export default DaumPost;
import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';



const DaumPost = (props: any) => {



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

    props.setAddressFunction(fullAddress)
    props.setZonecodeFunction(zonecode)


  };

  return (
    <>
      <DaumPostcode autoClose onComplete={onCompletePost} />
    </>
  );
};

export default DaumPost;
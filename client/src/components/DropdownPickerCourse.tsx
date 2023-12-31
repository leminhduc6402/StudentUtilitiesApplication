import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { axiosAPI, endpoints } from '../configs/axiosAPI';
import useUserContext from '../hook/useUserContext';

interface DataItem {
  label: string;
  value: number;
}

interface DataItems {
  data: DataItem[],
  currentValueTop: any;
  setCurrentValueTop: any;
  currentValueBottom: any;
  setCurrentValueBottom: any;
}

const DropdownPicker: React.FC<DataItems> = ({ data, currentValueTop, setCurrentValueTop, currentValueBottom, setCurrentValueBottom }) => {
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [isOpenBottom, setIsOpenBottom] = useState(false);
  const [dataBottom, setDataBottom] = useState([{ label: '', value: '' }]);
  const [user, setUser] = useUserContext();

  useEffect(() => {
    if (data.length > 0 && currentValueTop === null) {
      setCurrentValueTop(data[0].value);
    }
  }, [data]);

  useEffect(() => {
    if (dataBottom.length > 0 && currentValueBottom === null) {
      setCurrentValueBottom(dataBottom[0].value);
    }
  }, [dataBottom]);

  useEffect(() => {
    switch (currentValueTop) {
      case 1:
        setDataBottom([{ label: '', value: '' }])
        break;
      case 2: {
        const handleDepartments = async () => await axiosAPI
          .get(endpoints.DEPARTMENT)
          .then((res) => {
            let transformedData = res.data.data.map((item: any, index: any) => ({
              label: item.name,
              value: item._id
            }));
            setDataBottom(transformedData);
          })
          .catch((err) => {
            console.log(err.response.data || err.message);
          })
        handleDepartments()
        break;
      }
      case 3:
        const handleClasses = async () => await axiosAPI
          .get(endpoints.CLASS)
          .then((res) => {
            let transformedData = res.data.data.map((item: any, index: any) => ({
              label: item.name,
              value: item._id
            }));
            setDataBottom(transformedData);
          })
          .catch((err) => {
            console.log(err.response.data || err.message);
          })
        handleClasses()
        break;
      case 4:
        const handleSubjects = async () => await axiosAPI
          .get(endpoints.SUBJECT)
          .then((res) => {
            let transformedData = res.data.data.map((item: any, index: any) => ({
              label: item.name,
              value: item._id
            }));
            setDataBottom(transformedData);
          })
          .catch((err) => {
            console.log(err.response.data || err.message);
          })
        handleSubjects()
        break;
    }
  }, [currentValueTop])
  
  // console.log(currentValueBottom)
  // console.log(currentValueBottom)

  return (
    <>
      <View style={{ margin: 10 }}>
        <DropDownPicker
          items={data}
          open={isOpenTop}
          setOpen={() => setIsOpenTop(!isOpenTop)}
          value={currentValueTop}
          setValue={(val) => setCurrentValueTop(val)}
          zIndex={1000}
          // style={{ zIndex: 1000 }}
          // containerStyle={{ zIndex: 1000 }}
          disableBorderRadius={true}
          placeholderStyle={{ opacity: 0.6 }}
        />
      </View>
      {currentValueTop != 1 && <View style={{ margin: 10 }}>
        <DropDownPicker
          items={dataBottom}
          open={isOpenBottom}
          setOpen={() => setIsOpenBottom(!isOpenBottom)}
          value={currentValueBottom}
          setValue={(val) => setCurrentValueBottom(val)}
          zIndex={500}
          // style={{ zIndex: 500 }}
          // containerStyle={{ zIndex: 500 }}
          disableBorderRadius={true}
          placeholderStyle={{ opacity: 0.6 }}
        />
      </View>}
    </>)
}

export default DropdownPicker;
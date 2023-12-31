import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#0C56D0',
    padding: 20,
  },
  containerK: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
    // marginTop: -30,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    width: '100%',
    height: 45,
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  imageLogo: {
    width: 250,
    height: 250,
    marginTop: 40,
  },
  dropDownPicker: {
    width: '100%',
    marginTop: 20,
    zIndex: 10000,
  },
  viewUser: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageIcon: {
    marginLeft: -50,
    width: 30,
    height: 30,
    backgroundColor: '#fff',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFF',
  },
  viewTextCopyRight: {
    alignItems: 'center',
    marginTop: 20,
  },
  textCopyRight: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

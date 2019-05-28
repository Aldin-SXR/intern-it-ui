import Immutable from "seamless-immutable";

const initialState = Immutable({
    professionOptions: [
        { key: 'bs', value: 'bs', text: 'Business' },
        { key: 'cs', value: 'cs', text: 'Computer Science' },
        { key: 'ec', value: 'ec', text: 'Economics' },
        { key: 'it', value: 'it', text: 'Information Technologies' },
        { key: 'man', value: 'man', text: 'Management' }
    ]
});

export default initialState;
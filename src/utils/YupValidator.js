import * as Yup from 'yup';

// RegEx for validation
// const emailRegExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/

// Schema for yup
const ProductSchema = Yup.object().shape({
    ten: Yup.string()
        .min(2, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('Bắt buộc')
})

const FeatureSchema = Yup.object().shape({
    loaiDacTrung: Yup.string()
        .min(2, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('Bắt buộc'),
    ten: Yup.string()
        .required('Bắt buộc'),
    moTa: Yup.string()
        .required('Bắt buộc')
})

const CategorySchema = Yup.object().shape({
    ten: Yup.string()
        .min(2, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('Bắt buộc')
})

const validator = {
    ProductSchema,
    FeatureSchema,
    CategorySchema
}

export default validator
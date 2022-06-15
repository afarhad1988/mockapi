import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import 'boxicons'
import {toast, ToastContainer} from "react-toastify";



const AddUserModal = ({students, setStudents, setOpenModal, editingUser, setEditingUser}) => {



	const formik = useFormik({
		initialValues: {
			name: editingUser?.name || '',
			group: editingUser?.group || '',
			year: editingUser?.year || '',
			phone: editingUser?.phone || '',
			email: editingUser?.email || '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
					.max(20, 'Must be 15 characters or less')
					.required('Введите данные'),
			group: Yup.string()
					.max(20, 'Must be 20 characters or less')
					.required('Введите данные'),
			year: Yup.string()
					.max(20, 'Must be 20 characters or less')
					.required('Введите данные'),
			phone: Yup.string()
					.max(20, 'Must be 20 characters or less')
					.required('Введите данные'),
			email: Yup.string().email('Invalid email address').required('Введите данные'),
		}),
		onSubmit: async (values) => {
			if(editingUser){
				const {data: updateUser} = await axios.put(`https://6298e09cf2decf5bb74d8896.mockapi.io/students/${editingUser.id}`, values)
				const updateStudentsList = students.map(item => item.id === editingUser.id ? updateUser : item)
				setStudents(updateStudentsList)
				toast.success("Change information about student")
			} else{
				const uploadUser = await axios.post('https://6298e09cf2decf5bb74d8896.mockapi.io/students', values)
				setStudents([...students, uploadUser.data])
				toast.success("Add new student")

			}
			setOpenModal(false)
		},
	});

	return (
			<div className='fixed justify-center flex w-full bg-white p-6 '>
				<div className='absolute right-1/3 top-14 cursor-pointer text-pink-500' onClick={() => {
					setOpenModal(false)
					setEditingUser(null)
				}}>
					<box-icon name='x-circle' type='solid' color='#b606da'></box-icon>

				</div>
				<form onSubmit={formik.handleSubmit}
					  className='mb-10 mt-10 '>
					<div className='flex items-center container ml-auto'>
						<div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-auto">
							<div className="flex justify-center py-4">
								<div className="flex md:p-4 p-2">
									<img src="https://1000logos.net/wp-content/uploads/2017/02/Colors-Harvard-Logo.jpg"
										 width={100} alt=""/>
								</div>
							</div>
							<div className="flex justify-center">
								<div className="flex">
									<h1 className="text-gray-600 font-bold md:text-2xl text-xl">Добавить студента</h1>
								</div>
							</div>
							<div className="grid grid-cols-1 mt-5 mx-7">
								<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Ф.И.О.</label>
								<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
									   type="text" placeholder="Popov" name='name' id='name'
									   onChange={formik.handleChange} value={formik.values.name}/>
								{formik.errors.name ? <div className='text-red-500'>{formik.errors.name}</div> : null}

							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Группа
									</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="text"  placeholder="ИПП-22" name='group' id='group'
										   onChange={formik.handleChange} value={formik.values.group}/>
									{formik.errors.group ? <div className='text-red-500' >{formik.errors.group}</div> : null}
								</div>
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Год
										поступления</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="date"  placeholder="2022" name='year' id='year'
										   onChange={formik.handleChange} value={formik.values.year}/>
									{formik.errors.year ? <div className='text-red-500'>{formik.errors.year}</div> : null}
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Телефон</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="text"  placeholder="+996555000001" id='phone' name='phone'
										   onChange={formik.handleChange} value={formik.values.phone}/>
									{formik.errors.phone ? <div className='text-red-500'>{formik.errors.phone}</div> : null}
								</div>
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Email
									</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="email"  placeholder="mail@mail.ru" name='email' id='email'
										   onChange={formik.handleChange} value={formik.values.email}/>
									{formik.errors.email ? <div className='text-red-500'>{formik.errors.email}</div> : null}
								</div>
							</div>
							<div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
								<button className=' rounded-xl w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>{editingUser ? "Save" : "Create"}
								</button>
							</div>
						</div>
					</div>
				</form>
				<ToastContainer/>
			</div>
	);
};
export default AddUserModal;

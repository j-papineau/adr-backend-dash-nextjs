import React, {useEffect, useState} from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'
import { FaCode } from 'react-icons/fa'
import { Divider } from 'antd'
import { Modal, Input, Row, Checkbox, Button, Text } from '@nextui-org/react'

const UserListItem = ({user, openEditModal, refreshList}) => {
  
    
    

    const [name, setName] = useState(user.userData.name);
    const [email, setEmail] = useState(user.userData.email);
    const [privileges, setPrivileges] = useState(user.userData.privileges);
    const [team, setTeam] = useState(user.userData.team);
   

    function renderIcon(){

        switch(privileges){
            case "admin":
                return <RiAdminLine/>
            case "dev":
                return <FaCode/>
            default:
                return <AiOutlineUser/>
        }


    }

    const [visible, setVisible] = useState(false);
    const handler = () => {
        setVisible(true);
    }
    const closeHandler = () => {
        setVisible(false);
    }

    //TODO THESE FUNCS AND MODAL

    function doChanges(){

    }

    function noChanges(){

    }

  
  
    return (
    <div>
        <div className='flex flex-row justify-between items-center m-2 text-black dark:text-slate-300'>
            <div className='text-2xl flex flex-col justify-center items-center'>
                {renderIcon()}
                <p className='text-sm'>{privileges}</p>
            </div>
            
            <div className='flex flex-col md:flex-row justify-center items-center'>
                <p className='tracking-wide md:m-3'>{name}</p> 
                <p className='text-sm tracking-wider font-thin'>{team}</p>
            </div>
             
            <p className='md:flex text-sm italic hidden'>{email}</p>
           
            <Button auto  bordered  onPress={handler}>
                Edit
            </Button>
            <Modal
            closeButton
            blur
            aria-labelledby='modal'
            open={visible}
            onClose={closeHandler}>
                <Modal.Header>
                    <Text size={18}>Edit User Info</Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        id="name"
                        label='Name'
                        clearable
                        bordered
                        fullWidth
                        color='primary'
                        size='lg'
                        initialValue={name}
                        onChange={(e) => setName(e.target.value)}
                        />




                </Modal.Body>
            </Modal>
            
        </div>
        <Divider className='bg-black dark:bg-slate-300'/>
    </div>

  )
}

export default UserListItem
import React, {useEffect, useState} from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'
import { FaCode } from 'react-icons/fa'
import { Divider } from 'antd'
import { Modal, Input, Row, Checkbox, Button, Text, Spacer} from '@nextui-org/react'
import { teams, privs } from '../data/defaults'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";

  import { doc, setDoc } from 'firebase/firestore'
  import { db } from '../firebase'


const UserListItem = ({user, openEditModal, refreshList, uid}) => {
  
    
    

    const [name, setName] = useState(user.userData.name);
    const [email, setEmail] = useState(user.userData.email);
    const [privileges, setPrivileges] = useState(user.userData.privileges);
    const [team, setTeam] = useState(user.userData.team);

    const [tempPriv, setTempPriv] = useState(privileges)
    const [tempTeam, setTempTeam] = useState(team);
   
    //const teamNames = teams

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

    async function doChanges(){

        console.log("saving new")

        let userData = {
            darkMode: user.userData.darkMode,
            email: email,
            name: name, 
            privileges: tempPriv,
            team: tempTeam
        }

        await setDoc(doc(db, "Users", uid), {
           userData
        }).then(refreshList)



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
                        disabled
                        bordered
                        fullWidth
                        color='primary'
                        size='lg'
                        value={name}
                        />
                    <Input
                        id="email"
                        label='Email'
                        disabled
                        bordered
                        fullWidth
                        color='primary'
                        size='lg'
                        value={email}
                        />
                   
                    <Text>Team</Text>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button size='md' color="gradient">
                                {tempTeam}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(e) => setTempTeam(e)} variant='faded' aria-label='team-select' items={teams}>
                            {(item) => (
                                <DropdownItem 
                                className='bg-white p-2'
                                    key={item.key}
                                >
                                    {item.teamName}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <Text>Privilege Level</Text>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button size="md" color="gradient">
                                {tempPriv}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(e) => setTempPriv(e)} variant='faded' aria-labelledby='priv-level' items = {privs}>
                            {(item) => (
                                <DropdownItem
                                className='bg-white py-2 px-10'
                                key={item.priv}>
                                    {item.priv}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    
                    <Spacer/>
                    <Button size={"md"} color={"warning"} onPress={doChanges}>Save Changes</Button>




                </Modal.Body>
            </Modal>
            
        </div>
        <Divider className='bg-black dark:bg-slate-300'/>
    </div>

  )
}

export default UserListItem
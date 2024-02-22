import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGearFill } from 'react-icons/bs';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import '../css/Admin.css';

interface AdminSideBarProps {
    openSidebarToggle: boolean;
    OpenSidebar: () => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ openSidebarToggle, OpenSidebar }) => {
    return (
        <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> Always Fresh
                </div>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to="/admin" className="nav-link_admin" >
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </NavLink>
                </li>

                <li className='sidebar-list-item'>
                    <NavLink to="/item/upload-fruit" className="nav-link_admin" >
                        <IoCloudUploadOutline className='icon' /> Upload
                    </NavLink>
                </li>

                <li className='sidebar-list-item'>
                    <NavLink to="/item/retrieve-all-item" className="nav-link_admin" >
                        <BsFillArchiveFill className='icon' /> Products
                    </NavLink>
                </li>

                <li className='sidebar-list-item'>
                    <NavLink to="/" className="nav-link_admin" >
                        <BsFillGearFill className='icon' /> Logout
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default AdminSideBar;

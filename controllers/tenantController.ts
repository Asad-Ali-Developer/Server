import { Request, Response } from 'express';
import tenantModel from '../models/tenantModel';
import userModel from '../models/userModel';
import qrCode from 'qrcode'

const AddNewTenant = async (req: Request, res: Response) => {
    try {
        const id = req.params._id;

        // Validate the _id
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const User = await userModel.findById(id);

        if (!User) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const { tenantName, phone, AnotherPhone, members, address, rentDecided, date, idNumber, IdFileLink } = req.body;

        // For QR-Code 
        const qrCodeData = `TENANT DETAILS: \n\n Tenant Name: ${tenantName},\n Id Card Number: ${idNumber},\n Members: ${members},\n Phone: ${phone},\n Address: ${address},\n Rent: ${rentDecided},\n Date: ${date},\n Id Card Link: ${IdFileLink}`;

        const QrCode = await qrCode.toDataURL(qrCodeData)     // Generate QR code as Base64 string

        const Tenants = await tenantModel.create({
            userId: User._id,
            tenantName,
            phone,
            AnotherPhone,
            members,
            address,
            rentDecided,
            date,
            idNumber,
            IdFileLink,
            QrCode,
        });

        // Push tenant ID to user's tenant list and save user
        User.tenants.push(Tenants._id);

        await User.save();

        res.status(200).json({ message: 'Tenant added successfully', tenant: Tenants });

    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

const AllTenants = async (req: Request, res: Response) => {
    try {
        const id = req.params._id;

        // Validate the _id
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const User = await userModel.findById(id).populate('tenants');

        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ tenants: User.tenants });


    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
}




const GetTenant = async (req: Request, res: Response) => {

    try {

        const id = req.params._id;

        const tenant = await tenantModel.findById(id);

        if (!tenant) {
            res.status(404).json({ message: 'Tenant not found' });
        }

        res.status(200).json({ tenant });


    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}




const DeleteTenant = async (req: Request, res: Response) => {

    try {
        const id = req.params._id;

        const tenant = await tenantModel.findByIdAndDelete(id);

        if (!tenant) {
            res.status(404).json({ message: 'Tenant not found' });
        }


        // When deleting the tenant, remove it from the user's tenant list
        await userModel.updateMany(
            { tenants: tenant?._id },
            { $pull: { tenants: tenant?._id } }
        )


        res.status(200).json({ message: 'Tenant deleted successfully' });

    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error' });
    }

}



const UpdateTenant = async (req: Request, res: Response) => {
    try {

        const id = req.params._id;

        const data = req.body;

        const Tenant = await tenantModel.findByIdAndUpdate(id, data, { new: true });

        if (!Tenant) {
            res.status(404).json({ message: 'Tenant not found' });
        }

        res.status(200).json({ message: 'Tenant updated successfully' });


    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error' });
    }
}


export default { AddNewTenant, AllTenants, GetTenant, DeleteTenant, UpdateTenant };

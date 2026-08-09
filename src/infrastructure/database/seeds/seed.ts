/* import { AppDataSource } from '../data-source';
import { Roles } from 'src/domain/entities/Roles';
import { Users } from 'src/domain/entities/Users';
import { UserRoles } from 'src/domain/entities/UserRoles';
import { PasswordService } from 'src/application/services/helper/password.service';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';

async function seed() {
    const passService = new PasswordService();

    // Initialize the data source
    await AppDataSource.initialize();
    console.log('Data Source Initialized');

    const roleRepository = AppDataSource.getRepository(Roles);
    const userRepository = AppDataSource.getRepository(Users);
    const userRolesRepository = AppDataSource.getRepository(UserRoles);

    // 1. Seed Roles
    let adminRole = await roleRepository.findOne({ where: { name: 'admin' } });
    if (!adminRole) {
        adminRole = await roleRepository.save({
            name: 'admin',
            createAt: new Date(),
            recordStatus: recordStatus.Active, // Assuming 1 represents 'Active'
        });
        console.log('Seeded Role: admin');
    } else {
        console.log('Role "admin" already exists');
    }

    let clientRole = await roleRepository.findOne({ where: { name: 'client' } });
    if (!clientRole) {
        clientRole = await roleRepository.save({
            name: 'client',
            createAt: new Date(),
            recordStatus: recordStatus.Active, // Assuming 1 represents 'Active'
        });
        console.log('Seeded Role: client');
    } else {
        console.log('Role "client" already exists');
    }

    // 2. Seed Users
    let adminUser = await userRepository.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
        adminUser = await userRepository.save({
            username: 'admin',         
           
            password: await passService.hashPassword('Admin@123'), // Replace with your secure password
           
            createAt: new Date(),
            recordStatus: recordStatus.Active, // Assuming 1 represents 'Active'
           
        });
        console.log('Seeded User: admin');
    } else {
        console.log('User "admin" already exists');
    }

    // 3. Seed UserRoles
    const existingUserRole = await userRolesRepository.findOne({
        where: { user: { id: adminUser.id }, role: { id: adminRole.id } },
        relations: ['user', 'role'], // Ensure relations are loaded for the check
    });

    if (!existingUserRole) {
        await userRolesRepository.save({
            user: adminUser,
            role: adminRole,
            createAt: new Date(),
            recordStatus: recordStatus.Active, // Assuming 1 represents 'Active'
            userId: adminUser.id,
        });
        console.log('Seeded UserRole: admin');
    } else {
        console.log('UserRole "admin" already exists');
    }

    // Close the connection
    await AppDataSource.destroy();
    console.log('Seeding Complete');
}

seed().catch((error) => {
    console.error('Seeding Failed:', error);
    process.exit(1);
});
 */
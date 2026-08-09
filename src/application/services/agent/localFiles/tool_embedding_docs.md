
# Tool Name
create_role

**Tool Name**: create_role  
**Description**: Create a new role for users.  
**When to use**: When setting up user permissions or access levels for a system.  
**Business keywords**: role, user, permissions, access control, security  
**Examples**:  
1. "Create a 'Admin' role with full system access."  
2. "Create a 'Guest' role with limited access to public resources."

---



# Tool Name
 update_role

**Tool Name**: update_role  
**Description**: Updates an existing role by modifying its name and/or status. This tool allows changing the role's name and setting its active/inactive status.  
**When to use**: Use this tool when you need to rename a role or update its status (e.g., deactivate an obsolete role or activate a newly created one).  
**Business keywords**: role management, role update, status change, role name modification, role deactivation  
**Examples**:  
1. Rename the role "Admin" to "Super Admin" and set its status to active (recordStatus=1).  
2. Change the role "Guest" to "Visitor" and mark it as inactive (recordStatus=0).

---



# Tool Name
delete_role

**Tool Name**: delete_role  
**Description**: Deletes an existing role by specifying its name.  
**When to use**: Use this tool to remove a role that is no longer needed, such as redundant roles or roles with incorrect permissions.  
**Business keywords**: role management, user permissions, access control, security compliance, system cleanup  
**Examples**:  
1. Delete the "Guest" role to remove unused access.  
2. Correct a role named "Admin-Test" that was accidentally created with elevated permissions.

---



# Tool Name
assign_role_operations

**Tool Name**: assign_role_operations  
**Description**: Assign specific operations to a role within an application, defining the permissions the role can execute.  
**When to use**: Use this tool when configuring roles in an application to grant or restrict access to specific operations, ensuring proper access control.  
**Business keywords**: Role, Operations, Permissions, Access Control, Authorization, Security, Role-Based Access Control (RBAC)  
**Examples**:  
1. Assign "read" and "write" operations to the role "Admin":  
   `role_Name: "Admin", operation_names: ["read", "write"]`  
2. Assign all existing operations to the role "Editor":  
   `role_Name: "Editor", operation_names: ["all"]`

---


# HOW APPROVE PRO DEPLOYMENT WITH PAT.

REPOSITORY WITH CI FILES: https://github.com/rodrigociro/action-tester
REPOSITORY WITH WORKFLOWS & ACTIONS: https://github.com/rodrigociro/tsc-init/tree/workflows

This project is to represent the CI of a "control-m" where it is provided:

- semantic version of the VERSION file
- Merge or not to master (true/false)
- protection rules by environment and how to approve them through external parties (DMP)


# semantic version of the VERSION file

Format: `<type>(<scope>): <subject>`
```
00.00.00
^   ^  ^
|   |  |
|   |  +-> "FEAT: <commit message>"  <--- Update the patch version
|   |
|   +----> "FIX: <commit message>"   <--- Update the minor version  
|
+--------> "CHORE: <commit message>" <--- Update the major version
```

# COMMITS


![test_of_commits](https://github.com/rodrigociro/tsc-init/assets/23638418/8f68da41-d358-433c-b01b-fcc0c26bbe8d)



## fix:


![fix_version](https://github.com/rodrigociro/tsc-init/assets/23638418/789ca14a-470a-43db-a4f6-bb883b22baaa)



## patch:


![patch_version](https://github.com/rodrigociro/tsc-init/assets/23638418/402e0085-74f1-44aa-a046-ef70d210763c)



## chore:


![chore_version](https://github.com/rodrigociro/tsc-init/assets/23638418/e04f4c03-21ce-4e38-a965-3ef9179a7642)



## commit syntax not correct


![image](https://github.com/rodrigociro/tsc-init/assets/23638418/c143c13e-5e58-4932-9710-c3a6ed6b496c)



## skip-ci


![image](https://github.com/rodrigociro/tsc-init/assets/23638418/125586da-54ed-40ad-98ea-e27a3526dde5)



# isRelease (true/false)

In our CI development file we can change the "is release" parameter to true or false.
- false: the deployment job will be executed in DEV
- true: the deployment job will be executed in DEV, the VERSION file validation and the commit to master will be executed. Additionally, a commit will be made in the development branch with the statement "skip-ci:" to avoid unnecessary relaunches

## false 


![image](https://github.com/rodrigociro/tsc-init/assets/23638418/a16907f7-17b4-4be3-8723-32c70890e6b6)



## true


![image](https://github.com/rodrigociro/tsc-init/assets/23638418/5b9af264-f1b3-455b-842c-763e8a02d033)











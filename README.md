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

![test_of_commits](https://github.com/rodrigociro/tsc-init/assets/23638418/8f68da41-d358-433c-b01b-fcc0c26bbe8d)

![patch_version](https://github.com/rodrigociro/tsc-init/assets/23638418/402e0085-74f1-44aa-a046-ef70d210763c)

![chore_version](https://github.com/rodrigociro/tsc-init/assets/23638418/e04f4c03-21ce-4e38-a965-3ef9179a7642)

![image](https://github.com/rodrigociro/tsc-init/assets/23638418/c143c13e-5e58-4932-9710-c3a6ed6b496c)

![fix_version](https://github.com/rodrigociro/tsc-init/assets/23638418/789ca14a-470a-43db-a4f6-bb883b22baaa)






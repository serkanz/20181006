import NodePowershell from "node-powershell";



// const shell = require('node-powershell');

const ps = new NodePowershell({
    executionPolicy: "Bypass",
    noProfile: true
});

ps.addCommand("Get-EventLog -Newest 5 -LogName 'Application' -ComputerName srv-moss-test");
ps.invoke()
    .then(output => {
        console.log(output);
        ps.dispose();
    })
    .catch(err => {
        console.log(err);
        ps.dispose();
    });
module.exports = () => {
  const customerWalletsDB = require("../data/customerWallets.json");
  const controller = {};
  const uuidv4 = require("uuid/v4");

  const { customerWallets: customerWalletsMock } = customerWalletsDB;

  controller.listCustomerWallets = (req, res) =>
    res.status(200).json(customerWalletsDB);

  controller.saveCustomerWallets = (req, res) => {
    customerWalletsMock.data.push({
      id: uuidv4(),
      parentId: uuidv4(),
      name: req.body.name,
      birthDate: req.body.birthDate,
      cellphone: req.body.cellphone,
      phone: req.body.phone,
      email: req.body.email,
      occupation: req.body.occupation,
      state: req.body.state
    });

    res.status(200).json(customerWalletsMock);
  };

  controller.removeCustomerWallets = (req, res) => {
    const { customerId } = req.params; //obtem valor enviado por parametro com desestruturação
    const foundCustomerIndex = customerWalletsMock.data.findIndex(
      customer => customer.id === customerId
    ); //percorre a lista customerWalletsMock e executa o método "findIndex" do array. se achar o customer com mesmo ID o retorno é sua posição na lista
    // se o método não encontrar ele retorna -1

    if (foundCustomerIndex === -1) {
      res.status(404).json({
        message: "Cliente não encontrado.",
        success: false,
        customerWallets: customerWalletsMock
      });
    } else {
      //o metodo splice é utilizado para splice para atualizar a lista de customerWalletsMock
      //no primeiro parâmetro passamos a posição do customer encontrado
      //no segundo parâmetro passamos a quantidade de elementos para deleção
      customerWalletsMock.data.splice(foundCustomerIndex, 1);
      res.status(200).json({
        message: "Cliente encontrado e deletado com sucesso!",
        success: true,
        customerWallets: customerWalletsMock
      });
    }
  };

  controller.updateCustomerWallets = (req, res) => {
    const { customerId } = req.params;
    const foundCustomerIndex = customerWalletsMock.data.findIndex(
      customer => customer.id === customerId
    );

    if (foundCustomerIndex === -1) {
      res.status(404).json({
        message: "Usuário não encontrado",
        success: false,
        customerWallets: customerWalletsMock
      });
    } else {
      const newCustomer = {
        id: customerId,
        parentId: req.body.parentId,
        name: req.body.name,
        birthDate: req.body.birthDate,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date()
      };

      // é enviado um novo parametro no splite.
      //depois de passar a posição do customer encontrado e a quantidade de itens deletados,
      //é setado o novo valor que irá substitui-lo
      customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);
      res.status(200).json({
        message: "Cliente encontrado e atualizado com sucesso!",
        success: true,
        customerWallets: customerWalletsMock
      });
    }
  };

  return controller;
};

// Yerel JSON dosyasını okuma
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch('/data/users.json');
      const users = await response.json();
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        return user;
      } else {
        throw new Error('Kullanıcı bulunamadı');
      }
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      // Kayıt işlemi için yerel JSON dosyasına yazma işlemi yapılmaz, sadece örnek olarak gösterilir
      console.log('Kayıt başarılı:', { name, email, password });
      return { name, email, password };
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      console.log('Çıkış yapıldı');
      return { message: 'Çıkış yapıldı' };
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  },
};

export const financeAPI = {
  getTransactions: async () => {
    try {
      const response = await fetch('/data/transactions.json');
      const transactions = await response.json();
      return transactions;
    } catch (error) {
      console.error('Get Transactions Error:', error);
      throw error;
    }
  },
  addTransaction: async (transaction: any) => {
    try {
      // Yerel JSON dosyasına yazma işlemi yapılmaz, sadece örnek olarak gösterilir
      console.log('İşlem eklendi:', transaction);
      return transaction;
    } catch (error) {
      console.error('Add Transaction Error:', error);
      throw error;
    }
  },
  updateTransaction: async (id: string, transaction: any) => {
    try {
      // Yerel JSON dosyasına güncelleme işlemi yapılmaz, sadece örnek olarak gösterilir
      console.log(`İşlem güncellendi: ${id}`, transaction);
      return transaction;
    } catch (error) {
      console.error('Update Transaction Error:', error);
      throw error;
    }
  },
  deleteTransaction: async (id: string) => {
    try {
      // Yerel JSON dosyasından silme işlemi yapılmaz, sadece örnek olarak gösterilir
      console.log(`İşlem silindi: ${id}`);
      return { message: 'İşlem silindi' };
    } catch (error) {
      console.error('Delete Transaction Error:', error);
      throw error;
    }
  },
};
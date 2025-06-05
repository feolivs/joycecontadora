import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
]

const clientsData = [
  { name: 'Novos', value: 400 },
  { name: 'Ativos', value: 300 },
  { name: 'Inativos', value: 200 },
]

const documentsData = [
  { name: 'Jan', documentos: 2400, contratos: 4000 },
  { name: 'Fev', documentos: 1398, contratos: 3000 },
  { name: 'Mar', documentos: 9800, contratos: 2000 },
  { name: 'Abr', documentos: 3908, contratos: 2780 },
  { name: 'Mai', documentos: 4800, contratos: 1890 },
  { name: 'Jun', documentos: 3800, contratos: 2390 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Reports() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Relatórios
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Vendas Mensais */}
        <motion.div variants={item} className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Vendas Mensais
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1a365d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribuição de Clientes */}
        <motion.div variants={item} className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Distribuição de Clientes
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {clientsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Documentos vs Contratos */}
        <motion.div variants={item} className="card lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Documentos vs Contratos
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={documentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="documentos"
                  stroke="#1a365d"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="contratos"
                  stroke="#4a5568"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 
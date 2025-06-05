import { motion } from 'framer-motion'
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'Mai', value: 500 },
  { name: 'Jun', value: 700 },
]

const stats = [
  { name: 'Total de Clientes', value: '1,234', icon: UserGroupIcon, change: '+12%' },
  { name: 'Documentos Pendentes', value: '23', icon: DocumentTextIcon, change: '-5%' },
  { name: 'Vendas do Mês', value: 'R$ 45.678', icon: ChartBarIcon, change: '+8%' },
  { name: 'Alertas', value: '3', icon: BellIcon, change: '+2' },
]

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

export default function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            variants={item}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600">
                  {stat.change}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        variants={item}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Vendas nos Últimos 6 Meses
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1a365d"
                fill="#1a365d"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Assistant */}
      <motion.div
        variants={item}
        className="card"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Como posso te ajudar hoje?"
              className="input"
            />
          </div>
          <button className="btn btn-primary">
            Enviar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
} 
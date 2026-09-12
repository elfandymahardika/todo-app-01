import ApiTodoList from './components/ApiTodoList';
import { getTasks } from '@/lib/tasks';

export default async function ApiTodosPage() {
  const { tasks, total } = await getTasks({ limit: 15, skip: 0 });

  return (
    <main className="min-h-screen bg-gray-30 px-4 py-8 text-dark-70 md:px-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <section className="overflow-hidden rounded-2xl border border-gray-70 bg-white shadow-xl">
          <header className="border-b border-gray-70 bg-dark-70 px-6 py-7 text-white md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-30">
                  Fetch Data
                </p>
                <h1 className="text-2xl font-bold md:text-3xl">Daftar Tugas dari API</h1>
                <p className="mt-2 text-sm text-gray-80">
                  Data diambil dari DummyJSON dan diperbarui secara optimistik saat status diubah.
                </p>
              </div>
              <div className="shrink-0 rounded-lg border border-dark-40 bg-dark-80 px-4 py-3 text-sm">
                <span className="block text-gray-80">Total tersedia</span>
                <strong className="text-lg text-white">{total} tugas</strong>
              </div>
            </div>
          </header>

          <div className="p-6 md:p-8">
            <ApiTodoList initialTasks={tasks} />
          </div>
        </section>
      </div>
    </main>
  );
}

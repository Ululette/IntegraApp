import supabase from '../supabase.config';


export default getSome = (table, columns) => {
    columns = columns ? columns : '*';

    const { data: laData, error: laDataError } = await supabase
  .from(table)
  .select(columns)

  return laData ? laData : laDataError
}
-- Undo docs/reminders-two-water-checkins.sql: water check-ins back to 9am, noon, 3pm, 6pm and 9pm.
do $$
declare
  src text;
  patched text;
begin
  select pg_get_functiondef('public.two_plates_reminder_check()'::regprocedure) into src;
  patched := replace(src, '(values (12),(18))', '(values (9),(12),(15),(18),(21))');
  if patched = src then
    raise exception 'Nothing to change: the water times are not the trimmed two';
  end if;
  execute patched;
end $$;

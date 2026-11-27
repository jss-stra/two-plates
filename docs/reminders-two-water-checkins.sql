-- Two Plates: send the water check-in at noon and 6pm only (was 9am, noon,
-- 3pm, 6pm and 9pm). Safe to run any time, as many times as you like.
--
-- It rewrites the water times inside the reminder function that is already
-- installed, so your project URL and secret stay exactly as they are.
-- Undo: docs/reminders-five-water-checkins.sql.

do $$
declare
  src text;
  patched text;
begin
  select pg_get_functiondef('public.two_plates_reminder_check()'::regprocedure) into src;
  patched := replace(src, '(values (9),(12),(15),(18),(21))', '(values (12),(18))');
  if patched = src then
    raise exception 'Nothing to change: the water times are not the original five (already trimmed?)';
  end if;
  execute patched;
end $$;

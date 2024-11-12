// schemas/service.js
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'doctors',
      title: 'Doctors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'doctor' }] }],
    }),
    defineField({
      name: 'availableAppointments',
      title: 'Available Appointments',
      type: 'array',
      of: [
        defineField({
          name: 'appointment',
          title: 'Appointment Slot',
          type: 'object',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'datetime',
              description: 'The date on which the appointment is available.',
              options: {
                dateFormat: 'YYYY-MM-DD',
              },
            }),
            defineField({
              name: 'startTime',
              title: 'Start Time',
              type: 'datetime',
              description: 'The start time of the available appointment slot.',
              options: {
                timeFormat: 'HH:mm:ss',
              },
            }),
            defineField({
              name: 'endTime',
              title: 'End Time',
              type: 'datetime',
              description: 'The end time of the available appointment slot.',
              options: {
                timeFormat: 'HH:mm:ss',
              },
            }),
          ],
          preview: {
            select: {
              date: 'date',
              startTime: 'startTime',
              endTime: 'endTime',
            },
            prepare(selection) {
              const { date, startTime, endTime } = selection;
              const dateFormatted = new Date(date).toLocaleDateString();
              const startTimeFormatted = new Date(startTime).toLocaleTimeString();
              const endTimeFormatted = new Date(endTime).toLocaleTimeString();
              return {
                title: `Date: ${dateFormatted}`,
                subtitle: `From ${startTimeFormatted} to ${endTimeFormatted}`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});



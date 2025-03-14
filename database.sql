PGDMP  5                    }         	   ClassRide    17.2    17.2 A               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    24579 	   ClassRide    DATABASE     �   CREATE DATABASE "ClassRide" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE "ClassRide";
                     postgres    false            �            1259    24850    buses    TABLE     )  CREATE TABLE public.buses (
    bus_id integer NOT NULL,
    owner_id integer NOT NULL,
    plate_number character varying(20) NOT NULL,
    capacity integer NOT NULL,
    model character varying(100),
    driver_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.buses;
       public         heap r       postgres    false            �            1259    24849    buses_bus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.buses_bus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.buses_bus_id_seq;
       public               postgres    false    222                       0    0    buses_bus_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.buses_bus_id_seq OWNED BY public.buses.bus_id;
          public               postgres    false    221            �            1259    24619    drivers    TABLE     �   CREATE TABLE public.drivers (
    driver_id integer NOT NULL,
    name character varying(100),
    assigned_bus_id integer,
    schedule jsonb,
    payment_details jsonb
);
    DROP TABLE public.drivers;
       public         heap r       postgres    false            �            1259    24618    drivers_driver_id_seq    SEQUENCE     �   CREATE SEQUENCE public.drivers_driver_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.drivers_driver_id_seq;
       public               postgres    false    220                       0    0    drivers_driver_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.drivers_driver_id_seq OWNED BY public.drivers.driver_id;
          public               postgres    false    219            �            1259    24870 	   locations    TABLE     
  CREATE TABLE public.locations (
    location_id integer NOT NULL,
    owner_id integer NOT NULL,
    name character varying(255) NOT NULL,
    latitude numeric(9,6),
    longitude numeric(9,6),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.locations;
       public         heap r       postgres    false            �            1259    24869    locations_location_id_seq    SEQUENCE     �   CREATE SEQUENCE public.locations_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.locations_location_id_seq;
       public               postgres    false    224                       0    0    locations_location_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.locations_location_id_seq OWNED BY public.locations.location_id;
          public               postgres    false    223            �            1259    24916    payments    TABLE       CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    owner_id integer NOT NULL,
    user_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_date date DEFAULT CURRENT_DATE NOT NULL,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT payments_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'completed'::character varying, 'failed'::character varying])::text[])))
);
    DROP TABLE public.payments;
       public         heap r       postgres    false            �            1259    24915    payments_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.payments_payment_id_seq;
       public               postgres    false    228                       0    0    payments_payment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;
          public               postgres    false    227            �            1259    24883 	   schedules    TABLE     �  CREATE TABLE public.schedules (
    schedule_id integer NOT NULL,
    owner_id integer NOT NULL,
    bus_id integer NOT NULL,
    driver_id integer NOT NULL,
    pickup_time time without time zone NOT NULL,
    dropoff_time time without time zone NOT NULL,
    start_location_id integer NOT NULL,
    end_location_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.schedules;
       public         heap r       postgres    false            �            1259    24882    schedules_schedule_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schedules_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.schedules_schedule_id_seq;
       public               postgres    false    226                       0    0    schedules_schedule_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.schedules_schedule_id_seq OWNED BY public.schedules.schedule_id;
          public               postgres    false    225            �            1259    24609    students    TABLE        CREATE TABLE public.students (
    student_id integer NOT NULL,
    name character varying(100),
    university character varying(100),
    location character varying(100),
    schedule text,
    attendance text DEFAULT false,
    payment_details jsonb
);
    DROP TABLE public.students;
       public         heap r       postgres    false            �            1259    24608    students_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.students_student_id_seq;
       public               postgres    false    218                       0    0    students_student_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.student_id;
          public               postgres    false    217            �            1259    32896    users    TABLE     `  CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    password text NOT NULL,
    role character varying(50) DEFAULT 'student'::character varying,
    is_superadmin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    32895    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public               postgres    false    230                       0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public               postgres    false    229            B           2604    24853    buses bus_id    DEFAULT     l   ALTER TABLE ONLY public.buses ALTER COLUMN bus_id SET DEFAULT nextval('public.buses_bus_id_seq'::regclass);
 ;   ALTER TABLE public.buses ALTER COLUMN bus_id DROP DEFAULT;
       public               postgres    false    221    222    222            A           2604    24622    drivers driver_id    DEFAULT     v   ALTER TABLE ONLY public.drivers ALTER COLUMN driver_id SET DEFAULT nextval('public.drivers_driver_id_seq'::regclass);
 @   ALTER TABLE public.drivers ALTER COLUMN driver_id DROP DEFAULT;
       public               postgres    false    219    220    220            D           2604    24873    locations location_id    DEFAULT     ~   ALTER TABLE ONLY public.locations ALTER COLUMN location_id SET DEFAULT nextval('public.locations_location_id_seq'::regclass);
 D   ALTER TABLE public.locations ALTER COLUMN location_id DROP DEFAULT;
       public               postgres    false    223    224    224            H           2604    24919    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public               postgres    false    228    227    228            F           2604    24886    schedules schedule_id    DEFAULT     ~   ALTER TABLE ONLY public.schedules ALTER COLUMN schedule_id SET DEFAULT nextval('public.schedules_schedule_id_seq'::regclass);
 D   ALTER TABLE public.schedules ALTER COLUMN schedule_id DROP DEFAULT;
       public               postgres    false    225    226    226            ?           2604    24612    students student_id    DEFAULT     z   ALTER TABLE ONLY public.students ALTER COLUMN student_id SET DEFAULT nextval('public.students_student_id_seq'::regclass);
 B   ALTER TABLE public.students ALTER COLUMN student_id DROP DEFAULT;
       public               postgres    false    217    218    218            L           2604    32899    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public               postgres    false    229    230    230                      0    24850    buses 
   TABLE DATA           g   COPY public.buses (bus_id, owner_id, plate_number, capacity, model, driver_id, created_at) FROM stdin;
    public               postgres    false    222   �R                 0    24619    drivers 
   TABLE DATA           ^   COPY public.drivers (driver_id, name, assigned_bus_id, schedule, payment_details) FROM stdin;
    public               postgres    false    220   �R                 0    24870 	   locations 
   TABLE DATA           a   COPY public.locations (location_id, owner_id, name, latitude, longitude, created_at) FROM stdin;
    public               postgres    false    224   �R       	          0    24916    payments 
   TABLE DATA           k   COPY public.payments (payment_id, owner_id, user_id, amount, payment_date, status, created_at) FROM stdin;
    public               postgres    false    228   �R                 0    24883 	   schedules 
   TABLE DATA           �   COPY public.schedules (schedule_id, owner_id, bus_id, driver_id, pickup_time, dropoff_time, start_location_id, end_location_id, created_at) FROM stdin;
    public               postgres    false    226   S       �          0    24609    students 
   TABLE DATA           q   COPY public.students (student_id, name, university, location, schedule, attendance, payment_details) FROM stdin;
    public               postgres    false    218   0S                 0    32896    users 
   TABLE DATA           `   COPY public.users (user_id, name, phone, password, role, is_superadmin, created_at) FROM stdin;
    public               postgres    false    230   �S                  0    0    buses_bus_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.buses_bus_id_seq', 1, false);
          public               postgres    false    221                       0    0    drivers_driver_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.drivers_driver_id_seq', 1, false);
          public               postgres    false    219                       0    0    locations_location_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.locations_location_id_seq', 1, false);
          public               postgres    false    223                       0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 1, false);
          public               postgres    false    227                       0    0    schedules_schedule_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.schedules_schedule_id_seq', 1, false);
          public               postgres    false    225                       0    0    students_student_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.students_student_id_seq', 1, true);
          public               postgres    false    217                       0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 9, true);
          public               postgres    false    229            V           2606    24856    buses buses_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.buses
    ADD CONSTRAINT buses_pkey PRIMARY KEY (bus_id);
 :   ALTER TABLE ONLY public.buses DROP CONSTRAINT buses_pkey;
       public                 postgres    false    222            X           2606    24858    buses buses_plate_number_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.buses
    ADD CONSTRAINT buses_plate_number_key UNIQUE (plate_number);
 F   ALTER TABLE ONLY public.buses DROP CONSTRAINT buses_plate_number_key;
       public                 postgres    false    222            T           2606    24626    drivers drivers_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.drivers
    ADD CONSTRAINT drivers_pkey PRIMARY KEY (driver_id);
 >   ALTER TABLE ONLY public.drivers DROP CONSTRAINT drivers_pkey;
       public                 postgres    false    220            Z           2606    24876    locations locations_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public                 postgres    false    224            ^           2606    24925    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public                 postgres    false    228            \           2606    24889    schedules schedules_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (schedule_id);
 B   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_pkey;
       public                 postgres    false    226            R           2606    24617    students students_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public                 postgres    false    218            `           2606    32908    users users_phone_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_key;
       public                 postgres    false    230            b           2606    32906    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    230            c           2606    32914    buses buses_driver_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.buses
    ADD CONSTRAINT buses_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.users(user_id);
 D   ALTER TABLE ONLY public.buses DROP CONSTRAINT buses_driver_id_fkey;
       public               postgres    false    230    222    4706            d           2606    32909    buses buses_owner_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.buses
    ADD CONSTRAINT buses_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(user_id);
 C   ALTER TABLE ONLY public.buses DROP CONSTRAINT buses_owner_id_fkey;
       public               postgres    false    230    222    4706            e           2606    32919 !   locations locations_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(user_id);
 K   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_owner_id_fkey;
       public               postgres    false    4706    230    224            k           2606    32934    payments payments_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(user_id);
 I   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_owner_id_fkey;
       public               postgres    false    228    4706    230            l           2606    32939    payments payments_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 H   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_user_id_fkey;
       public               postgres    false    228    230    4706            f           2606    24895    schedules schedules_bus_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_bus_id_fkey FOREIGN KEY (bus_id) REFERENCES public.buses(bus_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_bus_id_fkey;
       public               postgres    false    226    222    4694            g           2606    32929 "   schedules schedules_driver_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.users(user_id);
 L   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_driver_id_fkey;
       public               postgres    false    4706    226    230            h           2606    24910 (   schedules schedules_end_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_end_location_id_fkey FOREIGN KEY (end_location_id) REFERENCES public.locations(location_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_end_location_id_fkey;
       public               postgres    false    224    226    4698            i           2606    32924 !   schedules schedules_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(user_id);
 K   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_owner_id_fkey;
       public               postgres    false    226    230    4706            j           2606    24905 *   schedules schedules_start_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_start_location_id_fkey FOREIGN KEY (start_location_id) REFERENCES public.locations(location_id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_start_location_id_fkey;
       public               postgres    false    226    224    4698                  x������ � �            x������ � �            x������ � �      	      x������ � �            x������ � �      �   c   x�3�����Sp�O��H,*K,JQ��,K-*�,��t�/.���Q�u���/���K�,)*M�VJ��/�+Q�R050�QP*.I,)-r�3S�j�b���� �i         �   x�u�;�0�������V�`�Ujb\$�0���,��y8��I9�r@�B*d*�j��y[�Ӆ����&C��:r i��8�r<�_�uN§L3�n9*P�4
p�9�%
�gv�/W���fx�o���Lo��y����T���mY�r{�Im������?���$��r��J0�\�>�     